# Generated by Django 5.1 on 2024-08-21 12:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug', '0002_alter_customuser_user_type_alter_projects_manager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bug',
            name='assigned_to',
            field=models.ForeignKey(limit_choices_to={'user_type': 'developer'}, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_to', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='bug',
            name='created_by',
            field=models.ForeignKey(limit_choices_to={'user_type__in': ['qa', 'manager']}, on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('developer', 'Developer'), ('qa', 'QA'), ('manager', 'Manager')], max_length=20),
        ),
    ]
