from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from ..models import CustomUser, Projects, Bug
from .serializers import CustomUserSerializer, ProjectsSerializer, BugSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class ProjectsViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        User = get_user_model()
        default_user = User.objects.filter(user_type='manager').first()

        if not default_user:
            return Response({"error": "Default manager user not found."}, status=status.HTTP_400_BAD_REQUEST)

        request.data['manager'] = default_user.id

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'], url_path='search')
    def search_projects(self, request):
        query = request.query_params.get('q', '')
        if query:
            projects = self.queryset.filter(name__icontains=query)
        else:
            projects = self.queryset.none()

        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

class BugViewSet(ModelViewSet):
    queryset = Bug.objects.all()
    serializer_class = BugSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'], url_path='(?P<project_id>\d+)')
    def bugs_by_project(self, request, project_id=None):
        bugs = Bug.objects.filter(project=project_id)
        serializer = self.get_serializer(bugs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='change-status')
    def change_status(self, request, pk=None):
        bug = self.get_object()
        new_status = request.data.get('status')

        if new_status not in ['new', 'started', 'completed', 'resolved']:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        bug.status = new_status
        bug.save()
        serializer = self.get_serializer(bug)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['delete'], url_path='delete-bug')
    def delete_bug(self, request, pk=None):
        try:
            bug = self.get_object()
            bug.delete()
            return Response({"message": "Bug deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Bug.DoesNotExist:
            return Response({"error": "Bug not found"}, status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = CustomUser.objects.get(email=email)
        if user:
            self.request.session['token'] = user.id
            return Response({"token": user.id, "username": user.username})
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        self.request.session.flush()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    
class DeveloperListView(generics.ListAPIView):
    serializer_class = CustomUserSerializer

    def get_queryset(self):
         return CustomUser.objects.filter(user_type="developer")

    