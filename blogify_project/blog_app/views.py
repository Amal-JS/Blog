from django.shortcuts import render

def index(request):
    return render(request,'index.html')

def post(request):
    return render(request,'post.html')