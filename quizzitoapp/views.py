from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.utils.datastructures import MultiValueDictKeyError
from django.urls import reverse
from django.template import loader
from .models import Questions_Database1 as Q1
from .models import Feedback
from random import shuffle
from .vars_funcs import *

# Create your views here.

def index(request):
    homepage = loader.get_template('index.html')
    return HttpResponse(homepage.render({}, request))


def notifier(request):
    '''
    Author: Demiz
    
    This function takes care of the admin notification page. 
    Note, html code as a notification should be structured properly to avoid error eg. avoid tags like <head>, <body> etc.
    Sending cost is totally free so send the message to yourself and see the result before ur broadcast!, also avoid
    some css styles like animation, transitions etc.
    '''
    notification_page = loader.get_template('notifier.html')
    context = dict(
        verification='',
        subject='',
        notification=''
    )
    if request.method == 'POST':
        ntf_subject = request.POST['email_subject']
        notification_msg = request.POST['notification']
        admin_ntf_pwd = request.POST['admin_pwd']
        verification = 'fields must not be empty!' if ntf_subject == '' or notification_msg == '' else admin_pwd_validator(admin_ntf_pwd)
        
        context['subject'] = ntf_subject
        context['notification'] = notification_msg
        context['verification'] = verification
        
        if 'successful' in verification.lower():
            for i in Feedback.objects.all():
                emailer(i.email, ntf_subject, notification_msg)
    return HttpResponse(notification_page.render(context, request))


def quiz(request, course_url_like, amount_of_questions=0, difficulty=None, quiz_header='', qgen_notice=''):
    '''
    Author: Demiz
    
    This function renders page for quizzes...
    '''

    courses = [i[0] for i in set(Q1.objects.values_list('course'))]
    ql_validator = quiz_link_validator(course_url_like)
    
    selected_course = course_url_like.split('-')
    quizdifficulty = 1 if not selected_course[-1].isnumeric() else int(selected_course[-1])
    difficulty = difficulty if difficulty else '1' if quizdifficulty < 5 else '2' if quizdifficulty < 9 else '3'
    amount_of_questions = amount_of_questions if amount_of_questions else 10 if difficulty == '1' else 20 if difficulty == '2' else 50
    quizlevel = ' '.join(selected_course[1:])
    course = selected_course[0]
    
    if (not ql_validator) or (len(selected_course) != 3) or (quizdifficulty > 10) or (selected_course[0] not in courses):
        return HttpResponse(loader.get_template('404.html').render({}, request))
    
    quiz_page_tem = loader.get_template('quiz.html')
    questions = Q1.objects.filter(course=course, difficulty=difficulty)
    questions = questions.all().order_by('?')[:amount_of_questions]
    questions_list = []; opt1 = []; opt2 = []; opt3 = []; opt4 = []
    answer = []
    for i in questions:
        questions_list.append(i.question)
        random_options = [i.option1, i.option2, i.option3, i.answer]
        answer.append(random_options[3])
        for x in range(5): shuffle(random_options)
        opt1.append(random_options[0])
        opt2.append(random_options[1])
        opt3.append(random_options[2])
        opt4.append(random_options[3])
    
    zipped = zip(range(amount_of_questions), questions_list, opt1, opt2, opt3, opt4, answer)
    zipped2 = zip(range(amount_of_questions), questions_list, opt1, opt2, opt3, opt4, answer)
    
    # Sessions with score_analyzation
    questions_taken = request.session.pop('questions_taken', []) # Means user has already taken or submitted a quiz
    selected_ans=request.session.pop('selected_ans', [])
    quizSubmit = request.session.pop('quizSubmit', '')
    timer_py = request.session.pop('timer_py', '00:00')
    user_score = request.session.get('user_score', 0)
    answered_qst_count = request.session.get('answered_qst_count', 0)
    attempted_qst_count = request.session.get('attempted_qst_count', 0)
    qgen_amount_of_questions = request.session.pop('qgen_amount_of_questions', 0)
    qgen_notice2 = request.session.pop('qgen_notice', '')
    qgen_difficulty = request.session.pop('qgen_difficulty', '')
    qgen_quiz_header = request.session.pop('qgen_header', '')
    quiz_header = qgen_quiz_header if qgen_quiz_header else quiz_header
    
    qgen_notice = qgen_notice if not qgen_notice2 else qgen_notice2
    context = dict(
        questions=questions_taken if questions_taken else zipped,
        selected_ans=selected_ans,
        course_category=course,
        course=course.upper() + ' ' + quizlevel if not quiz_header else quiz_header,
        course_url_like=course_url_like,
        amount_of_questions=qgen_amount_of_questions if qgen_amount_of_questions else amount_of_questions, 
        difficulty=qgen_difficulty if qgen_difficulty else quizDifficulties[difficulty].capitalize(), 
        qgen_notice=qgen_notice,
        
        quiz_submit=quizSubmit, 
        timer_py=timer_py, 
        user_score=user_score,
        answered_qst_count=answered_qst_count, 
        attempted_qst_count=attempted_qst_count,
        incorrects=amount_of_questions-answered_qst_count,
    )
    request.session['user_questions'] = list(zipped2)
    return HttpResponse(quiz_page_tem.render(context, request))


def score_analyzation(request, course):
    answered_qst_count = 0
    attempted_qst_count = 0
    selected_ans = []
    score_analyzer = request.session.pop('user_questions', None)
    request.session['questions_taken'] = score_analyzer
    if score_analyzer is not None:
        for i in score_analyzer:
            ans = i[6]
            try:
                selected_option = request.POST[f"question{i[0]+1}_ans"]
            except MultiValueDictKeyError:
                selected_option = None
                    
            selected_ans.append(selected_option)
            if selected_option:
                attempted_qst_count += 1
                if selected_option == ans:
                    answered_qst_count += 1
                else: 
                    pass
        user_score = round((answered_qst_count/len(score_analyzer)) * 100)
        
        # vars in session for/with quiz function
        request.session['user_score'] = user_score
        request.session['answered_qst_count'] = answered_qst_count
        request.session['attempted_qst_count'] = attempted_qst_count
        request.session['quizSubmit'] = 'on'
        request.session['timer_py'] = request.POST['timer_py']
        request.session['selected_ans'] = selected_ans
        if request.POST['qgen_notice']: 
            request.session['qgen_notice'] = True
            request.session['qgen_amount_of_questions'] = request.POST['qgen_amount_of_questions']
            request.session['qgen_difficulty'] = request.POST['qgen_difficulty']
            request.session['qgen_header'] = request.POST['qgen_header']
            
        
    return HttpResponseRedirect(redirect_to=f'/{course}')


def about(request):
    return render(request, 'about.html')


def quiz_generator(request):
    template = loader.get_template('Q_gen.html')
    contents = {
        'courses': [casing(i[0]) for i in set(Q1.objects.values_list('course'))], 
        'level': [(1, 'Easy'), (2, 'Medium'), (3, 'Hard')],
        'qgen_error1': '',
    }
    if request.method == 'POST':
        category = request.POST['category']
        difficulty = request.POST['qgen-difficulty']
        amt_of_questions = int(request.POST['qgen-amt'])
        
        questions = Q1.objects.filter(course=category.lower(), difficulty=difficulty)
        questions = questions.all().order_by('?')[:amt_of_questions]
        questions = [i.question for i in questions]
        amt_questions_available = len(questions)
        
        contents['selected_cat'] = casing(category)
        contents['selected_dif'] = quizDifficulties[difficulty].capitalize()
        contents['amt_of_questions'] = amt_of_questions
        contents['amt_error_occured'] = amt_of_questions > amt_questions_available
        contents['qgen_error1'] = f"Sorry!, only {amt_questions_available} questions available" 
        if not contents['amt_error_occured']:
            return quiz(
                request, 
                f'{category.lower()}-quiz-10', 
                amt_of_questions, 
                difficulty,
                f"Custom {contents['selected_cat']} Quiz", 
                True
                )
    return HttpResponse(template.render(contents, request))


def feedback(request):
    indexTemp = loader.get_template('index.html')
    context = {
        'initiatFeedbackEmailBox': 'off'
    }
    if request.method == "POST":
        user_email = request.POST['feedback_email']
        if not isInDB(user_email, Feedback):
            Feedback.objects.create(email=user_email)
            context['initiatFeedbackEmailBox'] = 'on'
        return HttpResponse(indexTemp.render(context, request))
    return HttpResponseRedirect(reverse('home'))