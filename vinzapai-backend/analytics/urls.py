from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RevenueDataViewSet, UserGrowthViewSet, TrafficSourceViewSet

router = DefaultRouter()
router.register(r'revenue', RevenueDataViewSet, basename='revenue')
router.register(r'user-growth', UserGrowthViewSet, basename='user_growth')
router.register(r'traffic-sources', TrafficSourceViewSet, basename='traffic_source')

urlpatterns = [
    path('', include(router.urls)),
]
