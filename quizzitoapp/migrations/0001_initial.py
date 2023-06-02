# Generated by Django 4.1.5 on 2023-01-05 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Questions_Database1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.CharField(max_length=100)),
                ('question', models.TextField()),
                ('answer', models.TextField()),
                ('option1', models.TextField()),
                ('option2', models.TextField()),
                ('option3', models.TextField()),
                ('difficulty', models.CharField(choices=[('1', 'easy'), ('2', 'medium'), ('3', 'hard')], default='1', max_length=100)),
            ],
        ),
    ]
