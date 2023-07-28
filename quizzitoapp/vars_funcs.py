from yagmail import SMTP
from re import search
from .models import Questions_Database1 as Q1


# VARIABLES

SERVER_EMAIL = 'koders.notify.gh@gmail.com'
SERVER_EMAIL_PASSWORD = 'qgpnhvwjixhcuujg' # DO NOT COPY
ADMIN_NOTIFICATION_PASSWORD = '12345'
AVAILABLE_QUIZZES = [i[0] for i in set(Q1.objects.values_list('course'))]
COURSE_RE_URL_PATTERN = r'[\w\W]+[#]?-quiz-[1-9]'
quizDifficulties = {
    '1': 'easy', 
    '2': 'medium', 
    '3': 'hard'
}




# FUNCTIONS

def quiz_urls_generator(course):
    urls = []
    for i in range(1, 11):
        urls.append({'url': f'/{course}-quiz-{i}', 'priority': '1.0', 'changefreq': 'daily'})
    return urls

quiz_urls = [quiz_urls_generator(quiz.lower()) for quiz in AVAILABLE_QUIZZES]
QUIZ_SITEMAP_ITEMS = [item for urls in quiz_urls for item in urls]


def admin_pwd_validator(user_input):
    if user_input == '':
        return 'You didn\'t enter admin password, try again!!!'
    elif user_input == ADMIN_NOTIFICATION_PASSWORD:
        return 'Notification sent Successfully!!!'
    return 'Wrong Password!!!, try again'


def emailer(user_email, subject, message):
    mail = SMTP(SERVER_EMAIL, SERVER_EMAIL_PASSWORD)
    mail.send(
            to=user_email, 
            subject=subject, 
            contents=message,
        )
    
def quiz_link_validator(url):
    return True if search(COURSE_RE_URL_PATTERN, url) else False
        
        
def isInDB(lookup_email, db):
    if db.objects.filter(email=lookup_email):
        return True
    return False


def casing(course: str):
    course = course.lower().strip()
    upper = ['html', 'css', 'r', 'c', 'c++', 'c#', 'php', 'sql']
    #caps = ['python', 'javascript', 'java', 'ruby']
    if course in upper: 
        return course.upper()
    return course.capitalize()