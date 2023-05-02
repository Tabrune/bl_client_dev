const provider = window.parent.ethereum;

if (!provider) {
    alert('Please install MetaMask to use this application');
} else if (provider.isMetaMask && !provider.isConnected()) {
    alert('Please connect MetaMask to a secure origin to use this application');
} else {
    provider.enable().then(() => {
        // Metamask is unlocked and connected to a secure origin, we can use it to interact with the Ethereum network
    }).catch((error) => {
        alert('Please unlock MetaMask to use this application');
    });
}