from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.homepage, name='index'),
    path('review/review/', views.review, name='复习单词'),
    path('review/homepage/', views.homepage, name='复习主页'),
    path('review/', views.homepage, name='复习主页'),
    path('calendar/', views.calendar, name='艾宾浩斯日历'),
    path('temp/', views.temp, name='temp'),
    path('import/', views.import_db, name='导入数据�?'),

    # 接口
    # GET
    path('review/get_word', views.get_word, name='获取单词'),
    path('review/get_calendar_data', views.get_calendar_data, name='获取日历渲染数据'),
    # POST
    path('review/review_a_word', views.review_a_word, name='获取单词'),
    path('review/review_list_finish', views.review_lists, name='复习结束'),
    path('review/update_word_flag', views.update_word_flag, name='更新单词flag'),
    path('review/update_note', views.update_note, name='更新单词note'),
    path('review/spider/other_dict', views.spider_other_dict,
         name='API_spider_other_dict'),
    # path('import-database/', views.import_db, name='导入数据�?'),
]
