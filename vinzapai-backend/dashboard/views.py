from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Metric, ActivityLog, AIInsight
from .serializers import MetricSerializer, ActivityLogSerializer, AIInsightSerializer


class MetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Metric.objects.all().order_by('order')
    serializer_class = MetricSerializer


class ActivityLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer


class AIInsightViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AIInsight.objects.filter(is_active=True)
    serializer_class = AIInsightSerializer


class DashboardSummaryViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def dashboard_summary(self, request):
        metrics = Metric.objects.all().order_by('order')
        activities = ActivityLog.objects.all()[:5]
        insights = AIInsight.objects.filter(is_active=True)[:3]

        return Response({
            'metrics': MetricSerializer(metrics, many=True).data,
            'recent_activities': ActivityLogSerializer(activities, many=True).data,
            'ai_insights': AIInsightSerializer(insights, many=True).data,
        })
