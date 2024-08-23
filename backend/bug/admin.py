from django.contrib import admin
from .models import CustomUser, Projects, Bug
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Projects)
admin.site.register(Bug)