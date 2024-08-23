from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPE = {
        ('manager','Manager'),
        ('developer', 'Developer'),
        ('qa', 'QA')
    }

    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE)

    def __str__(self):
        return self.username

class Projects(models.Model):
    manager = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'user_type': 'manager'})
    name = models.CharField(max_length=200)
    detail = models.TextField()

    def __str__(self):
        return self.name

class Bug(models.Model):
    Project_Type = [
        ('feature', 'Feature'),
        ('bug', 'Bug')
    ]

    Feature_Choice = [
        ('new', 'New'),
        ('started', 'Started'),
        ('completed', 'Completed')
    ]

    Bug_Choice = [
        ('new', 'New'),
        ('started', 'Started'),
        ('resolved', 'Resolved')
    ]

    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="bugs")
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_by', limit_choices_to={'user_type__in': ['qa', 'manager']})
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assigned_to', limit_choices_to={"user_type": 'developer'})

    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    screenshot = models.ImageField(upload_to='screenshots/', blank=True)
    type = models.CharField(max_length=7, choices=Project_Type)
    status = models.CharField(max_length=10,choices=Feature_Choice ,default='new')

    def __str__(self):
        return self.title