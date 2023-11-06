
document.addEventListener('DOMContentLoaded', () => {
    perfectScaler();
    screensizeDetector(); 
    typer(); 
    scaler('login-popup-main-box');
})


window.addEventListener('resize', () => {
    perfectScaler();
})