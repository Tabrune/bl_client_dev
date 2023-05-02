const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
    getSystemInfo: function () {
        return {
            arch: process.arch,
            platform: process.platform,
            release: os.release(),
        };
    },
    setWindowTitle: function (title) {
        ipcRenderer.send("set-title", title);
    },
    setBadgeCount: function (count) {
        ipcRenderer.send("set-badge-count", count);
    },
    sendMetamask: function (metamask) {
        ipcRenderer.send("metamask-ready", metamask);
    },
});