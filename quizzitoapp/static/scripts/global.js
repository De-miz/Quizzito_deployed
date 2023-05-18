
function closeLoader() {
    document.getElementById('loader-container').style.display = 'none';
}


function fadeIn(elemID) {
    let elem = document.getElementById(elemID), 
    opc = 0;
    elem.style.display = 'block';
    intervalID = setInterval(show, 1);
    function show() {
        if (opc >= 1) {
            clearInterval(intervalID);
        } else {
            opc += 0.001;
            elem.style.opacity = opc;
        }
    }
}


// EVENTS


setTimeout(() => {fadeIn('loader-canceler');}, 30000);

document.addEventListener('DOMContentLoaded', () => {
    screensizeDetector(); 
})

window.addEventListener('load', () => {closeLoader()});