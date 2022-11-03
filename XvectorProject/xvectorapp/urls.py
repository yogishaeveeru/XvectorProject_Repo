from django.urls import path,include
from xvectorapp import views
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'dataapi', views.DataViewSet,basename="Data")

urlpatterns = [
    path(r'',views.index,name='index'),
    path(r'data/',views.datas,name='data'),
    path(r'plot/',views.plot,name='plot'),
    path(r'data/upload/',views.upload,name='upload'),
    path('', include(router.urls)),
]