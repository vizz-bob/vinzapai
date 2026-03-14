from rest_framework import serializers
from .models import RevenueData, UserGrowth, TrafficSource


class RevenueDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueData
        fields = ['id', 'month', 'year', 'revenue', 'expenses', 'profit']


class UserGrowthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGrowth
        fields = ['id', 'month', 'year', 'new_users', 'active_users', 'churned_users']


class TrafficSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrafficSource
        fields = ['id', 'source', 'visitors', 'percentage', 'color']
