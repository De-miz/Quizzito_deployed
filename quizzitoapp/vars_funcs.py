from yagmail import SMTP
from re import search


# VARIABLES

SERVER_EMAIL = 'koders.notify.gh@gmail.com'
SERVER_EMAIL_PASSWORD = 'qgpnhvwjixhcuujg' # DO NOT COPY
ADMIN_NOTIFICATION_PASSWORD = '12345'
quizDifficulties = {
    '1': 'easy', 
    '2': 'medium', 
    '3': 'hard'
}



# FUNCTIONS

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
    return True if search(r'[\w\W]+-quiz-[1-9]', url) else False
        
        
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