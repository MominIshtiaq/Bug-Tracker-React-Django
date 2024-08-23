from rest_framework import serializers
from ..models import CustomUser, Projects, Bug


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'user_type', 'password')
    
    def create(self, validated_data):
        return super(CustomUserSerializer, self).create(validated_data)

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'name', 'detail', 'manager')
    
    def validate(self, data):
        if not data.get('name'):
            raise serializers.ValidationError({"name": "Project name is required."})
        if not data.get('detail'):
            raise serializers.ValidationError({"detail": "Project detail is required."})
        return data
    
    def create(self, validated_data):
        return super(ProjectsSerializer, self).create(validated_data)
            

class BugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bug
        fields = ('id', 'title', 'description', 'deadline', 'type', 'status', 'project', 'created_by', 'assigned_to')