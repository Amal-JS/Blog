from django.shortcuts import render
from . models import Post,Comment

def index(request):
    posts = Post.objects.order_by('-created', '-rating')

    return render(request,'index.html',{'posts':posts})

def post(request,id):
    post = Post.objects.get(id=id)
    comments = Comment.objects.filter(post=post)
    context = {'post':post,'comments':comments}
    return render(request,'post.html',context)