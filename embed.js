//const unityContainer = document.getElementById('wooden__UI')
const iframe = document.createElement('iframe')

// Set the source of the iframe to the Unity game's URL
iframe.src = 'https://beta.bitmates.io/'

// Set the attributes of the iframe to enable WebGL and allow fullscreen
iframe.setAttribute('allowfullscreen', '')
iframe.setAttribute('allow', 'fullscreen; xr-spatial-tracking; microphone; camera')

// Set the styles of the iframe to fill the parent div element
iframe.style.width = '100%'
iframe.style.height = '100%'
iframe.style.border = 'none'

// Append the iframe to the parent div element
//unityContainer.appendChild(iframe)
