
import json
from django.http import  JsonResponse
from django.shortcuts import redirect, render
from . models import Post,Comment,User
from django.db.models import F
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.hashers import make_password, check_password

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
    
    logout(request)
    return redirect('index')
   

def username_check(request):
    username = request.GET.get('username',None)
    print(User.objects.all())
    print(username,'   ',User.objects.filter(username=username).exists())
    if username != '' and username is not None and  User.objects.filter(username=username).exists():
        
        return JsonResponse({'userNameExist':True})

    return JsonResponse({'userNameExist':False})


def sign_up(request):
    if request.method == 'POST':
        data = request.body
        p_data = json.loads(data)
        
        hashed_password = make_password(p_data['password1'])
        user = User(username=p_data['username'],email=p_data['email'],password=hashed_password)
        print(user.username,user.password)
        user.save()
        print(user.id)
        return JsonResponse({'message':'Success'},status=200)
    return JsonResponse({'message': 'Failed'}, status=404)


