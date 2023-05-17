
function closeLoader() {
    console.log('hello')
    document.getElementById('loader-container').style.display = 'none';
}


// EVENTS
document.addEventListener('DOMContentLoaded', () => {
    screensizeDetector(); 
})

window.addEventListener('load', () => {closeLoader()});