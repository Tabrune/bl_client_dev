const { ipcRenderer } = require("electron");

window.addEventListener("load", () => {
    // Create a dummy provider object.
    const provider = {
        isMetaMask: true,
        request: async (request) => {
            console.log("Request sent:", request);
            return Promise.resolve({
                id: request.id,
                jsonrpc: request.jsonrpc,
                result: "0x",
            });
        },
    };

    // Send the dummy provider object to the main process.
    ipcRenderer.send("metamask-object", provider);
});