from django.urls import path
from . import views
urlpatterns = [

path('',views.index,name='index'),
path('post/<int:id>/',views.post,name='post'),
path('search/',views.search,name="search"),

path('sign_in/',views.sign_in,name='signin'),
path('sign_out/',views.sign_out,name='signout'),
path('signup/',views.sign_up)

]