// Variables

var mainTag = document.getElementById('main'),
sidemenu = document.getElementById("Side-menu"),
autoHideNav = true,

non_mobile_nav = document.getElementById('non-mobile-nav'), 
mobile_nav = document.getElementById('mobile-nav'),
mobileMenu = document.getElementById('hiddenmenu'),
menuIcon = document.getElementById('menu'),
navigationBar = document.getElementById('main-nav'),
scrollHistory = [], 

quizSubmit = document.getElementById('quizSubmit'),
timer_py = document.getElementById('timer_py'), // This is true right after a submittion and false after session

to_top_btn = document.getElementById("to-top"), 
initiatFeedbackEmailBox,

// Why Quiz and Qgen section at homepage
questions_for_typer = [
    'print(len(set("abracadabra")))? (Hint: The set() function returns a set object with unique characters from a string, and len() function returns the length of an iterable.)', 
    'How do you open a file in Python and read its contents? Can you explain the difference between reading a file line by line versus reading the entire file at once, and when you might use each method?', 
    'How do you create a list in Python and add or remove elements from it? Can you explain the difference between append() and extend() methods for adding elements, and how to use the pop() method to remove elements from a list based on their index position?', 
    'What is the purpose of the "img" tag in HTML? How do you specify the source and alternative text for an image using this tag? Can you explain the difference between a relative and absolute file path when specifying the image source?', 
    'What is the difference between null and undefined in JavaScript? How can you check if a variable has either of these values? Provide an example.', 
    'What is a closure in JavaScript? Provide an example of how you would use it in your code. Can closures cause memory leaks in your program? If yes, how can you prevent them?', 
    'Python is the most popular programming language, said Person A. Another person, B, said the most popular programming language is JavaScript, what do you think???', 
    "How would you write a C program that takes in user input, stores it in an array, sorts the array using a bubble sort algorithm, and then outputs the sorted array to the console?", 
    "Assuming you have two classes, Car and Engine, where each Car object has a single Engine object, how would you create a method within the Car class that allows you to access and modify the Engine object of that specific car instance in C?", 
    "Assuming you have a list of integers in Java, how would you iterate through the list and print out only the even numbers?"
], 
qft_topics = [
    'python-quiz-1', 
    'python-quiz-4', 
    'python-quiz-2', 
    'html-quiz-1', 
    'javascript-quiz-1', 
    'javascript-quiz-3', 
    'python-quiz-3', 
    'c-quiz-1', 
    'c-quiz-2', 
    'java-quiz-1'
], 
typerCount = 0, 
typerTrigger = true, 
qft_index = Math.floor(Math.random() * 10), 
msg=questions_for_typer[qft_index], 

resultPopupBox = document.getElementsByClassName('result'), // for popups
popups = document.getElementsByClassName('popup');

{//Usefull functions section

    function range(start, end='') {
        /**
         * This function works same as range() in python, if u no know
         * python no be my fault...
         */
        let x = [];
        if (end=='') {
            end = start;
            start = 0;
        }
        for (i = start; i < end; i++) {
            x.push(i);
        }
        return x;
    }


    function cap(word) {
        /**
         * Capitalize the first letter in a word.
         */
        word = word.split('')
        word.splice(0, 1, word[0].toUpperCase())
        return word.join('')
    }


    function fade_args ({elemID, direction='top', scale=1, speed=10, steps=100, configScroll=false}) {
        this.elemID = elemID;
        this.direction = direction;
        this.scale = scale;
        this.speed = speed;
        this.steps = steps;
        this.configScroll = configScroll;
    }
}

function screensizeDetector() {
    let screenWidth = window.innerWidth, screenHeight = window.innerHeight;
    if (screenWidth <= 480 || screenHeight <= 480) {
        non_mobile_nav.style.display = 'none';
        mobile_nav.style.display = 'block';
        sidemenu.style.display = 'none';
    } else if (screenWidth > 480 && screenWidth <= 700) {
        non_mobile_nav.style.display = 'block';
        non_mobile_nav.style.marginRight = '70px';
        mobile_nav.style.display = 'block';
        sidemenu.style.display = 'none';
    } else {
        mobile_nav.style.display = 'none'
        non_mobile_nav.style.display = 'block'
        sidemenu.style.display = 'block';
        non_mobile_nav.style.marginRight = `${screenWidth / 7.1}px`; 
    }

    mainTag.style.marginLeft = screenWidth <= 700 || screenHeight <= 480 ? 0: "230px";
}


function handleScroll(enable_scroll=true) {
    if (enable_scroll) {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}


function typer() {
    let typer_topic_link = document.getElementById('typer-topic-link-id'), 
    typer_paragraph = document.getElementById('typer-paragraph');
    if (typer_topic_link) {
        typer_topic_link.href = qft_topics[qft_index];
        if (typerTrigger) {
            if (typerCount < msg.length) {
                typer_paragraph.innerHTML += msg[typerCount];
                (typerCount == msg.length-1) ? setTimeout(typer, 100):setTimeout(typer, 30);
                typerCount++;
            } else {
                typerTrigger = false;
                setTimeout(reloadTyper, 5000)
            }
        }
    }
}


function stopTyper() {
    typerCount = msg.length;
}


function reloadTyper() {
    if (!typerTrigger) {
        let paragraph = document.getElementById('typer-paragraph').innerHTML;
        if (paragraph.length == 1) {
            paragraph = '';
            document.getElementById('typer-paragraph').innerHTML = paragraph;
            typerTrigger = true;
            typerCount = 0;
            qft_index = Math.floor(Math.random() * 10)
            msg=questions_for_typer[qft_index]
            typer();
        } else {
            paragraph = paragraph.slice(0, -1);
            document.getElementById('typer-paragraph').innerHTML = paragraph;
            setTimeout(reloadTyper, 10);
        }
    }
}


function showDropDown(menu) {
    let currentHeight = menu.style.height, course_title = menu.firstElementChild;
    if (currentHeight == '410px') {
        menu.style.height = course_title.style.height;
        course_title.style.backgroundColor = ''
    }
    else {
        menu.style.height = '410px';
        course_title.style.backgroundColor = '#b4daff';
    }
}


function resetMenuForMobile() { // function deprecated
    let img_file_path = menuIcon.src;
    img_file_path = img_file_path.split('/');
    img_file_path[img_file_path.length-1] = 'menu_icon.png'
    menuIcon.src = img_file_path.join('/');
    $forceDisappear(mobileMenu, new fade_args({elemID: mobileMenu.id, direction: 'middle', scale: 0.5, speed: 1, steps: 70}));
}


const getCookie = function (key='csrftoken') {
    let cookies = document.cookie.split(';');
    for (let i of cookies) {
        if (i.includes(key)) {
            return i.replace(`${key}=`, '')
        }
    }
}


const make_request = function (
    data={'COOKIE_WARNING': 1}, 
    method='GET', 
    callback=(function(){
        if (!this.has_been_warned) {
            $innerHTML('warningMsg', 'We use cookie to ensure user security on this website, this includes no personal data!');
            $displayManager(document.getElementById('cookie-warning-popup'));
        }
    })
    ) {

    let isGet = method == 'GET';
    let _, params = new URLSearchParams(data);
    let url = (method == 'GET') ? `${'/make_request/'}?${params}`: '/make_request/';
    fetch(
        url, 
        {
            method: method, 
            headers: {
                "Content-Type": "application/json", 
                "X-CSRFToken": getCookie(),
            }, 
            body: isGet ? null: JSON.stringify(data)
        }
    ).then (
        response => response.json()
    ).then (
        data => {
            if (Object.keys(data)) {
                data.callback = callback;
                data.callback();
            }
        }
    ).catch (
        error => {
            console.log(error);
        }
    )
}


{ // Author: Demiz

    var quizDescription = document.getElementById('quiz-description-background'), 
    startQuiz = document.getElementById('startquiz'), 
    quizResult = document.getElementById('result-background'), 
    CourseCards = {};

    var hour = 0, 
    minute = 0, 
    second = 0, 
    //sec_counter = 0,
    Seconds = '00', 
    Minutes = '00', 
    Hours = '00',
    status = 'on'; //Timer trigger




    function $displayManager(element, fade_arguments={}) {
        element.classList.toggle('showpopup');
    }


    function menuDrawer (elemID) {
        let menu = document.getElementById(elemID);
        // menu.innerText = (menu.innerText=='menu') ? 'close': 'menu';
        if (menu.innerText=='menu') {
            menu.innerText = 'close';
            autoHideNav = false;
        } else {
            menu.innerText = 'menu';
            autoHideNav = true;
        }
        document.getElementById('hiddenmenu').classList.toggle('undoer');
    }


    function $innerHTML(ID, message='') {
        let element = document.getElementById(ID);
        element.innerHTML = message;
    }


    function $forceDisappear(element, fade_arguments={}) { // deprecated
        /**
         * if fade_arguments is not null, then it must be an anonymous function
         * with argument elementID eg. (function(elementID){})
         */
        if (Object.keys(fade_arguments).length) {
            fadeOut(fade_arguments);
        } else {
            element.style.display = 'none';
        }
        handleScroll();
    }
    

    function elementDisplaySwitcher(elem1, elem2, is_image=false, display_type='block') // deprecated (under review)
    {
        /**
         * This function switches display properties to none between 2 elements 
         * when is_image=false else changes the src of img tag.
         * 
         * params:
         *      is_image (default value = false): a boolean value which when true, tells the function to switch btw images else an html object.
         *      elem1 : this is an HTMLImageElement object when is_image=true else the current/first HTMLElement to be switched.
         *      elem2 : this is a list of the 2 images filename when is_image=true else the second HTMLElement to be switched.
         *      display_type (default value = 'block'): the property of display.
         */
        currentElement = elem1.style.display;
        if (is_image) {
            imgFilepath = elem1.src;
            imgFilepath = imgFilepath.split('/');
            imgFilepath.pop();
            imgFilepath = imgFilepath.join('/') + '/';
            img1 = imgFilepath + elem2[0];
            img2 = imgFilepath + elem2[1];
            elem1.src = elem1.src == img1 ? img2: img1;
        } else {
            if (currentElement != 'none') {
                elem1.style.display = 'none';
                elem2.style.display = display_type;
            } else {
                elem1.style.display = display_type;
                elem2.style.display = 'none';
            }
        }
    }

    function quizNavigator(element) {
        url = startQuiz.href.split('/'); 
        url.pop()
        startQuiz.href = url.join('/') + '/' + element.id;
    }


    var for_quizSubmit = () => {
        quizAnalyzer();
        $displayManager(document.getElementById('result-background'), new fade_args({elemID: 'result-background', direction: 'middle', scale: 0.5, speed: 1, steps: 30}));
        elementDisplaySwitcher(document.getElementById('submit-btn-container'), document.getElementById('after-quiz-btns'));
    }


    function executeOnTrigger(trigger, callback) {
        /** Author Demiz
         * 
         * This function executes a functions (some expressions allowed)
         * base on the trigger argument and turns off
         * the trigger after the scripts execution.
         * 
         * Note: trigger has to be true in order to execute
         * callback function and scripts is a list
         */
        trigger = trigger.innerHTML;
        if (trigger == 'on') {
            callback();
            trigger = 'off';
            status = 'off';
        }
    }


    function tryAgainQuiz() {
        let qgen_notice, course_url_like = document.getElementById('course_url_like').innerHTML;
        try {
            qgen_notice = document.getElementById('qgen_notice').value;
        } catch (error) {
            qgen_notice = '';
        }
        window.location.href = qgen_notice ? 'qgen': course_url_like;
    }


    function quizAnalyzer(element=window.location.href, non_qgen_notice=false, quiz_category='', quiz_difficulty='', quiz_total_questions=0) {
        let qgen_notice = '', questions_answered, quiz = '',
        quiz_time_taken = document.getElementById('timer');
        element = element == window.location.href ? element.split('/').pop(): element.id;
        try {
            if (!non_qgen_notice) {
                qgen_notice = document.getElementById('qgen_notice').value;
                questions_answered = document.getElementById('answered_qst_count').innerHTML;
            }
        } catch (error) {
            questions_answered = 0;
        }

        if (!qgen_notice) {
            quiz = element.split('-');
            quiz_category = cap(quiz[0]);
            quiz_difficulty = Number(quiz[2]);

            if (quiz_difficulty < 5) { quiz_difficulty = 'Easy'; quiz_total_questions = 10 }
            else if (quiz_difficulty < 9) { quiz_difficulty = 'Medium'; quiz_total_questions = 20 }
            else { quiz_difficulty = 'Hard'; quiz_total_questions = 50 }
        } else {
            quiz_category = document.getElementById('course_category').innerHTML;
            quiz_difficulty = document.getElementById('difficulty').innerHTML;
            quiz_total_questions = Number(document.getElementById('amount_of_questions').innerHTML);
        }

        quiz_time_taken = (!quiz_time_taken) ? '':quiz_time_taken;
        document.getElementById('time-taken').innerHTML = 'Total time taken: ' + quiz_time_taken.innerHTML;
        document.getElementById('answered').innerHTML = 'Total Answered: ' + questions_answered;
        document.getElementById('incorrects').innerHTML = 'Incorrects: ' + (quiz_total_questions - questions_answered); // includes unattempted questions
        for (i = 0; i < 2; i++) {
            document.getElementsByName('quiz-level')[i].innerHTML = quiz ? cap(quiz[1]) + ' ' + quiz[2]: 'Custom Quiz';
            document.getElementsByName('quiz-category')[i].innerHTML = "Quiz Category: " + quiz_category;
            document.getElementsByName('quiz-difficulty')[i].innerHTML = "Quiz Difficulty: " + quiz_difficulty;
            document.getElementsByName('total-questions')[i].innerHTML = "Total Questions: " + quiz_total_questions;
        }
    }

    function quizManager(element, non_qgen_notice=false) {
        quizAnalyzer(element, non_qgen_notice);
        quizNavigator(element);
        $displayManager(quizDescription, new fade_args({elemID: quizDescription.id, direction: 'middle', scale: 0.5, speed: 1, steps: 30}));
    }

    function mobileMenuLinksEventsManager(element, non_qgen_notice=false) {
        quizManager(element, non_qgen_notice); 
    }

    function stopWatch() {
        if (status == 'on') {
            timer.innerHTML = (Hours != '00') ? 
            Hours + ':' + Minutes + ':' + Seconds: Minutes + ':' + Seconds;
            Seconds = (second < 10) ? '0'+second: second;
            Minutes = (minute < 10) ? '0'+minute: minute;
            Hours = (hour < 10) ? '0'+hour: hour;
            second++;
            if (second == 60) {
                second = 0;
                minute++;
            }
            if (minute == 60) {
                minute = 0;
                hour++;
            }
            timer_py.value = timer.innerHTML
        }
    }


    function timing(callback){
        setInterval(callback, 1000);
    }


    function linkTo(target) {
        /**
         * target is the name of the course, however this is already setup for you
         */
        window.location.href = target + '-quiz-1';
    }

    function $addNewCourse(course, description, img) {
        /**
         * course: the name of the new added course to be displayed.
         * description: this is a short description about the new course, this is hidden and shown when hovered.
         * img: this is the name of new added course card background image; Make sure the image file is present in 'static/img'.
         */
        var new_description_id = course + 'ID', 
        courseCover_id = course + '_cover';

        function courseAttributes() {
            this.description = description;
            this.img = img;
        }
        
        CourseCards[course] = new courseAttributes();
        
        document.getElementById('_courseCard_button').id = course.toLowerCase();
        document.getElementById('courseID').id = course;
        document.getElementById('_description').id = new_description_id;
        document.getElementById('_cover').id = courseCover_id;
        courseCover = document.getElementById(courseCover_id);

        document.getElementById(course).innerHTML = cap(course);
        document.getElementById(new_description_id).innerHTML = description.length <= 75 ? description : "ERROR!!! LENGTH MUST BE 75 OR BELOW";
        courseCover.style.backgroundImage = `url('static/img/${img}')`;
        courseCover.style.backgroundSize = "cover";
    }
}
{
    try {
        initiatFeedbackEmailBox = document.getElementById('initiatFeedbackEmailBox').innerHTML;
    } catch (error) {
        initiatFeedbackEmailBox = '';
    }
    if (initiatFeedbackEmailBox == 'on') {
        // initiate email box
        window.location.href = "mailto:koders.notify.gh@gmail.com?subject = Updates/Feedback";

        //refresh (not really a reload) page after initiating email box
        window.location.href = './' 
    } else if (initiatFeedbackEmailBox == 'off') {
        $innerHTML('feed_popupMsg', 'This email already exists, you might have had a conversion \
        with koders.notify.gh@gmail.com, get to your gmail and continue feedbacks from there');
        $displayManager(document.getElementById('feed_popup'), new fade_args({elemID: 'feed_popup', direction: 'middle', scale: 0.5, speed: 1, steps: 30}));
    }
}



// Events 

make_request(); // check if user has been warned about cookies

window.onscroll = () => {
    if (autoHideNav) {
        scrollCoords = document.documentElement.scrollTop;
        scrollHistory.push(scrollCoords)
        if (scrollCoords > 5) {
            navigationBar.style.top = '-60px';
            navigationBar.style.backgroundColor = 'rgba(255, 255, 255, 0.774)';
            sidemenu.style.transition = '1s all ease-out';
            sidemenu.style.top = '0';
        } else {
            navigationBar.style.backgroundColor = 'white';
        }
        if (scrollHistory.length > 2) {
            scrollHistory.shift();
            if (scrollHistory[0] > scrollHistory[1]) {
                navigationBar.style.top = '0';
                sidemenu.style.transition = '0.5s all linear';
                sidemenu.style.top = '58px';
            }
        }
    
        if (scrollCoords >= 700) {
            to_top_btn.style.display = "block";
            to_top_btn.style.bottom = '10px';
            to_top_btn.style.opacity = '1'
            
        } else {
            to_top_btn.style.bottom = '-70px';
            to_top_btn.style.opacity = '0'
        }
    }
}


for (i=0; i<resultPopupBox.length; i++) {
    (
        function(index) {
            resultPopupBox[index].addEventListener('click', function(event) {
                event.stopPropagation();
            })
        }
    )(i)
}
