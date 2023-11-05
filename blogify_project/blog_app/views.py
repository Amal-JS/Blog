from django.shortcuts import render
from . models import Post

def index(request):
    posts = Post.objects.order_by('-created', '-rating')

    return render(request,'index.html',{'posts':posts})

def post(request):
    return render(request,'post.html')