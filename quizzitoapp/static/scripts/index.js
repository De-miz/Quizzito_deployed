
document.addEventListener('DOMContentLoaded', () => {
    perfectScaler();
    screensizeDetector(); 
    typer(); 
    scaler('login-popup-main-box');
    // $addNewCourse('Python', 'Python is not a programming language, True or False?', 'images.jpeg');
    // $addNewCourse('HTML', 'Is HTML5 supported by all browsers? let\'s find out', 'html.jpg');
    // $addNewCourse('JavaScript', 'Is JavaScript easy to start with or very difficult?', 'javascript-logo-1.png');
    // $addNewCourse('CSS', 'Is CSS a programming language or markup? let\'s find out', 'css_back.webp');
    // $addNewCourse('C', 'C is one of the prefered languages for Data Analytics, is this true?', 'c.jpg');
    // $addNewCourse('C++', 'Do you know C++ is not the best language for gaming? what\'d you think...', 'c++_background.png');
    // $addNewCourse('Java', 'Is it true Java is one of the prefered languages for web development?', 'java.png');
    // $addNewCourse('PHP', 'PHP is a server-side scripting language designed for web development.', 'php.jpg');
})


window.addEventListener('resize', () => {
    perfectScaler();
})