# Generated by Django 5.1 on 2024-08-21 12:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('qa', 'QA'), ('manager', 'Manager'), ('developer', 'Developer')], max_length=20),
        ),
        migrations.AlterField(
            model_name='projects',
            name='manager',
            field=models.ForeignKey(limit_choices_to={'user_type': 'manager'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
