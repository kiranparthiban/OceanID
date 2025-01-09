from django.contrib import admin
from django.urls import path, include
from api.views import home  # Import the home view
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', home, name='home'),
    path('', RedirectView.as_view(url='/api/')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
