from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    post_name = models.CharField(max_length=100)
    post_desc = models.TextField()
    created   = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images',null=True,blank=True)


    def __str__(self):
        return f"{self.post_name} : author ==> {self.user}"
    

    

class Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='post_comments')
    review = models.IntegerField(default=0,null=True,blank=True)
    desc = models.TextField()

    def __str__(self) -> str:
        return f" commented by : { self.user} on post {self.post.post_name}"
    

   

class UserImages(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to=('user_profile_images/'),blank=True,null=True)
    def __str__(self) -> str:
        return f" {self.user} profile pic"