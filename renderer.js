const { ipcRenderer } = require('electron')

// Handle the Metamask login button click event
document.getElementById('metamask-login').addEventListener('click', () => {
    ipcRenderer.send('login')
})

// Handle the login-success event, which is triggered when the Metamask login is successful
ipcRenderer.on('login-success', (event, data) => {
    document.getElementById('metamask-account').textContent = data.account
    document.getElementById('metamask-balance').textContent = `${data.balance} ETH`
})