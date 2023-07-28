from django.db import models
from .validations import *
from django.utils import timezone


# Questions in the Database should not be frequently deleted!!!
def duplicateDetector(data):
    '''
    Author: Demiz
    
    '''
    data = data.strip()
    if Questions_Database1.objects.filter(question=data):
        raise ValidationError('This question already exist!!!')


class Questions_Database1(models.Model):
    researcher_name = models.CharField(max_length=120, verbose_name="Your Name", default="demiz", validators=[to_lowercase])
    course = models.CharField(max_length=100, validators=[to_lowercase])
    question = models.TextField(validators=[duplicateDetector])
    answer = models.TextField(validators=[opt1_validation])
    option1 = models.TextField(validators=[opt2_validation])
    option2 = models.TextField(validators=[opt3_validation])
    option3 = models.TextField(validators=[opt4_validation])
    difficulty = models.CharField(
        max_length=100, 
        default='1', 
        choices=(
            ('1', 'easy'), 
            ('2', 'medium'), 
            ('3', 'hard')
        )
    )

    # date_added field was added after about 1000+ questions have been
    # added to the this table !!!
    date_added = models.DateField(default=timezone.now) 
    
    def __str__(self) -> str:
        return f'{self.question}  [{self.course.capitalize()}] [{self.id}]'
    
    
class Feedback(models.Model): 
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True, max_length=200)
    
    def __str__(self) -> str:
        return self.email