const fs = require("fs");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


process.on("message", (payload) => {
  const { tempFilePath, name } = payload;
  console.log(tempFilePath);
  console.log(`./temp/${name}`)

  const endProcess = (endPayload) => {
    const { statusCode, text } = endPayload;
    // Remove temp file
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        process.send({ statusCode: 500, text: err.message });
      }
    });
    // Format response so it fits the api response
    process.send({ statusCode, text });
    // End process
    process.exit();
  };

  // Process video and send back the result
  ffmpeg(tempFilePath)
    .fps(30)
    .addOptions(["-crf 28"])
    .on("end", () => {
      endProcess({ statusCode: 200, text: "Success" });
    })
    .on("error", (err) => {
      console.log(err)
      endProcess({ statusCode: 500, text: err.message });
    })
    .save(`./temp/${name}`);
});
