# Generated by Django 4.1.5 on 2023-01-14 15:20

from django.db import migrations, models
import quizzitoapp.validations


class Migration(migrations.Migration):

    dependencies = [
        ('quizzitoapp', '0005_alter_questions_database1_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions_database1',
            name='researcher_name',
            field=models.CharField(default='No Name', max_length=120, validators=[quizzitoapp.validations.to_lowercase], verbose_name='Your Name'),
        ),
    ]
