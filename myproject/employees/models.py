from django.db import models

class LoginAttempt(models.Model):
    mobile = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mobile} - {self.timestamp}"
