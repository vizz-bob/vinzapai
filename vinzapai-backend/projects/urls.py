from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TeamMemberViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'team', TeamMemberViewSet, basename='team')

urlpatterns = [
    path('', include(router.urls)),
]
