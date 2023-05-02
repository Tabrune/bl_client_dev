const { ipcRenderer } = require('electron');

// Get Metamask object from main process and expose to window
window.api = {};
ipcRenderer.invoke('myAPI.sendMetamask').then((metamask) => {
    if (metamask) {
        window.api.metamask = metamask;
    }
});

// Login with Metamask and send request to main process
async function loginMetamask() {
    const response = await ipcRenderer.invoke('login-metamask');
    if (response.address) {
        console.log(`Logged in with Metamask. Address: ${response.address}`);
    } else if (response.error) {
        console.error(response.error);
    }
}