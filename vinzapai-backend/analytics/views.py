from rest_framework import viewsets
from .models import RevenueData, UserGrowth, TrafficSource
from .serializers import RevenueDataSerializer, UserGrowthSerializer, TrafficSourceSerializer


class RevenueDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RevenueData.objects.all().order_by('year', 'month')
    serializer_class = RevenueDataSerializer


class UserGrowthViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserGrowth.objects.all().order_by('year', 'month')
    serializer_class = UserGrowthSerializer


class TrafficSourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrafficSource.objects.all()
    serializer_class = TrafficSourceSerializer
