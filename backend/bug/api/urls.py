from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, ProjectsViewSet, BugViewSet, LoginView, LogoutView, DeveloperListView
from django.urls import path

post_router = DefaultRouter()
post_router.register(r'users', CustomUserViewSet) # can add basename
post_router.register(r'projects', ProjectsViewSet)
post_router.register(r'bug', BugViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('developers/', DeveloperListView.as_view(), name='developers')
]

urlpatterns += post_router.urls