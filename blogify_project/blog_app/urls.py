from django.urls import path
from . import views
urlpatterns = [

# index
path('',views.index,name='index'),
# get a specafic post
path('post/<int:id>/',views.post,name='post'),
# search 
path('search/',views.search,name="search"),

# user sign in , log out and sign up
path('sign_in/',views.sign_in,name='signin'),
path('sign_out/',views.sign_out,name='signout'),
path('signup/',views.sign_up),
# existing username check
path('username_check/',views.username_check),

# add review
path('add_review/<int:post_id>/',views.add_review,name='add_review')
]