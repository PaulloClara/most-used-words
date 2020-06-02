const { ipcMain } = require("electron");

const pipe = require("./pipeline");
const groupWords = require("./groupWords");
const prepareData = require("./prepareData");
const pathsToRows = require("./pathsToRows");

ipcMain.on("process-subtitles", async function(event, paths) {
  event.reply(
    "process-subtitles",
    await pipe(paths).toAsync(pathsToRows, prepareData, groupWords)
  );
});
