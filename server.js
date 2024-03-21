const express = require("express");
const { fork } = require("child_process");
const PORT = 5000;
const app = express();
const multer = require("multer");
const path = require("path");

var fileUpload = multer();

app.post("/compress-media", fileUpload.single('media'), (req, res, next) => {
  console.log(req.file)
  const filename = req.file.filename;
  const originalName = req.file.originalname;
  const tempFilePath = `${req.file.destination}/${filename}`;

  if (filename && tempFilePath) {
    // Create a new child process
    const child = fork("video.js");
    // Send message to child process
    child.send({ tempFilePath, name: originalName });
    // Listen for message from child process
    child.on("message", (message) => {
      const { statusCode, text } = message;
      res.status(statusCode).send(text);
    });
  } else {
    res.status(400).send("No file uploaded");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on  http://localhost:${PORT}`);
});