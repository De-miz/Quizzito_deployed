from .views import *
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from .sitemaps import *



sitemaps = {
    'static': QuizzitoMainSitemap,
}


urlpatterns = [
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name= 'django.contrib.sitemaps.views.sitemap'),
    path('', index, name='home'), 
    path('admin/', admin.site.urls), # HIDEN FOR PRODUCTION
    path('feedback', feedback, name='feedback'), 
    path('accounts/', include('allauth.urls')),
    path('about', about, name='about'),
    path('qgen', quiz_generator, name='qgen'),
    path('accounts/', include('allauth.urls')),
    path('score/<str:course>', score_analyzation, name='score'),
    path('<str:course_url_like>', quiz, name='quiz'), 
    path('notification/12345', notifier),
]


if settings.DEBUG: 
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)