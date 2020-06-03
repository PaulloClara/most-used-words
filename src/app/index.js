const { ipcMain } = require("electron");

const pipe = require("pipe-to");
const groupWords = require("./groupWords");
const prepareData = require("./prepareData");
const pathsToRows = require("./pathsToRows");

ipcMain.on("process-subtitles", async function(event, paths) {
  event.reply(
    "process-subtitles",
    await pipe(paths).asyncTo(pathsToRows, prepareData, groupWords)
  );
});
