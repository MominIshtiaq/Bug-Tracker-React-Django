# Generated by Django 5.1 on 2024-08-21 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug', '0003_alter_bug_assigned_to_alter_bug_created_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bug',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('started', 'Started'), ('completed', 'Completed')], default='new', max_length=10),
        ),
    ]
