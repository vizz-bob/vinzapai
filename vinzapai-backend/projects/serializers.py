from rest_framework import serializers
from .models import Project, TeamMember


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'status', 'progress', 'budget', 'spent', 'start_date', 'end_date', 'team_size', 'ai_score', 'created_at']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'email', 'role', 'department', 'avatar_initials', 'is_active', 'joined_date', 'ai_productivity_score']
