
from django.http import  JsonResponse
from django.shortcuts import render
from . models import Post,Comment
from django.db.models import F
from django.contrib.auth import authenticate,login,logout

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



def sign_in(request):
    if request.method == 'GET':  # Ensure this view is accessed via a GET request
        username = request.GET.get('username', None)
        password = request.GET.get('password', None)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'userLogin': True})
        else:
            return JsonResponse({'userLogin': False})
    else:
        return JsonResponse({'userLogin': False})






def sign_out(request):
    return HttpResponse()