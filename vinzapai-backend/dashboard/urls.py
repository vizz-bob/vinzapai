from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MetricViewSet, ActivityLogViewSet, AIInsightViewSet, DashboardSummaryViewSet

router = DefaultRouter()
router.register(r'metrics', MetricViewSet, basename='metric')
router.register(r'activities', ActivityLogViewSet, basename='activity')
router.register(r'insights', AIInsightViewSet, basename='insight')
router.register(r'dashboard', DashboardSummaryViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
]
