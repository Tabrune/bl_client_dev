const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    sendMetamask: (metamask) => {
        window.metamask = metamask;
    },
});