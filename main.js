const { app, BrowserWindow, ipcMain, contextBridge } = require("electron");
const path = require("path");
const url = require("url");
const os = require("os");
const fs = require("fs");
const { spawn } = require("child_process");

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL("https://beta.bitmates.io/");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

app.on("ready", function () {
    createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS, it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});

contextBridge.exposeInMainWorld("myAPI", {
    sendMetamask: function (metamask) {
        ipcMain.once("metamask-ready", () => {
            console.log("Metamask object sent to main process");
        });
        mainWindow.webContents.executeJavaScript(
            `window.metamask = ${JSON.stringify(metamask)};`
        );
    },
});