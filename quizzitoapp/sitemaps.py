from django.contrib.sitemaps import Sitemap 
from .vars_funcs import QUIZ_SITEMAP_ITEMS



class QuizzitoMainSitemap(Sitemap):

    def items(self):
        s_items = [
            {'url': '/', 'priority': '1.0', 'changefreq': 'weekly'}, 
            {'url': '/about/', 'priority': '0.9', 'changefreq': 'weekly'}, 
            {'url': '/qgen/', 'priority': '1.0', 'changefreq': 'weekly'},
            *QUIZ_SITEMAP_ITEMS
        ]
        return s_items

    def location(self, obj):
        return obj['url']
    
    # def get_urls(self, obj):
    #     return obj['url']
    
    def priority(self, obj): 
        return obj['priority']
    
    def changefreq(self, obj):
        return obj['changefreq']