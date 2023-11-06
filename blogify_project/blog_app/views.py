from django.shortcuts import render
from . models import Post,Comment
from django.db.models import F

def index(request):
    posts = Post.objects.order_by('-created', '-rating')

    return render(request,'index.html',{'posts':posts})

def post(request,id):
    post = Post.objects.get(id=id)
    comments = Comment.objects.filter(post=post)
    context = {'post':post,'comments':comments}
    return render(request,'post.html',context)

def search(request):
    posts=None
    if request.method == 'POST':
        search_value = request.POST.get('search_value')
        
        if search_value != '':
            posts = Post.objects.filter(post_name__startswith=search_value)

    return render(request,'search.html',{'posts':posts})