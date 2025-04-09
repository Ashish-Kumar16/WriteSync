from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PageViewSet, BlockViewSet

router = DefaultRouter()
router.register(r'pages', PageViewSet, basename='page')
router.register(r'pages/(?P<page_id>[^/.]+)/blocks', BlockViewSet, basename='block')

urlpatterns = [
    path('', include(router.urls)),
]