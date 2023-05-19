
function closeLoader() {
    document.getElementById('loader-container').style.display = 'none';
}


function fadeIn(elemID, direction='top') {
    let elem = document.getElementById(elemID), 
    opc = 0, slideScale = (direction == 'top') | (direction == 'left') ? -100: 100, 
    increase = slideScale < 0 ? 1: -1;
    elem.style.display = 'block';
    intervalID = setInterval(show, 10);
    function show() {
        if (opc >= 1) {
            clearInterval(intervalID);
        } else {
            opc += 0.01;
            slideScale += increase;
            elem.style.opacity = opc;
            if (direction == 'top' | direction == 'bottom') {
                elem.style.transform = `translateY(${slideScale}%)`;
            } else {
                elem.style.transform = `translateX(${slideScale}%)`;
            }
        }
    }
}


// EVENTS


setTimeout(() => {fadeIn('loader-canceler');}, 15000);

document.addEventListener('DOMContentLoaded', () => {
    screensizeDetector(); 
})

window.addEventListener('load', () => {
    closeLoader();
    scaler('result-background-main-box');
    scaler('quiz-description-background-main-box');
    scaler('login-popup-main-box');
    scaler('feed-popup-main-box');
});

window.addEventListener('resize', () => {
    scaler('result-background-main-box');
    scaler('quiz-description-background-main-box');
    scaler('login-popup-main-box');
    scaler('feed-popup-main-box');
})