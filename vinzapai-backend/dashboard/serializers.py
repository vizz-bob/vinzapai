from rest_framework import serializers
from .models import Metric, ActivityLog, AIInsight


class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = ['id', 'name', 'value', 'change_percent', 'icon', 'color', 'prefix', 'suffix', 'order', 'updated_at']


class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ['id', 'activity_type', 'title', 'description', 'user_name', 'timestamp']


class AIInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIInsight
        fields = ['id', 'title', 'description', 'insight_type', 'priority', 'is_active', 'created_at']
