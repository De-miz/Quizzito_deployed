from django.contrib import admin
from .models import Questions_Database1, Feedback

# Register your models here.

class Questions_Admin(admin.ModelAdmin):
    list_display = [
        'course', 
        'question', 
        'answer', 
        'difficulty'
    ]



admin.site.register(Questions_Database1, Questions_Admin)
admin.site.register(Feedback)