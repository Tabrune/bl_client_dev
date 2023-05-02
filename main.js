// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.on('did-finish-load', () => {
        // Use the webContents API to interact with the loaded web page
        const { webContents } = mainWindow;

        // Embed the Unity game in a div element with the ID 'unity-container'
        webContents.executeJavaScript(`
      const unityContainer = document.createElement('div')
      unityContainer.id = 'unity-container'
      document.body.appendChild(unityContainer)
    `);

        // Embed Metamask in a div element with the ID 'metamask-container'
        webContents.executeJavaScript(`
      const metamaskContainer = document.createElement('div')
      metamaskContainer.id = 'metamask-container'
      document.body.appendChild(metamaskContainer)
    `);

        // Handle the Metamask login process using the ethereum.enable() function and the web3 API
        ipcMain.on('login', async () => {
            const accounts = await mainWindow.webContents.executeJavaScript('ethereum.request({ method: "eth_requestAccounts" })');
            const account = accounts[0];

            const web3 = new Web3(Web3.givenProvider);
            const balance = await web3.eth.getBalance(account);

            mainWindow.webContents.send('login-success', { account, balance });
        });
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});