from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Page(models.Model):
    title = models.CharField(max_length=200, default='Untitled')
    emoji = models.CharField(max_length=10, default='📄')
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='pages')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Block(models.Model):
    BLOCK_TYPES = (
        ('paragraph', 'Paragraph'),
        ('heading-1', 'Heading 1'),
        ('heading-2', 'Heading 2'),
        ('heading-3', 'Heading 3'),
        ('bulleted-list', 'Bulleted List'),
        ('numbered-list', 'Numbered List'),
        ('to-do', 'To-do'),
        ('image', 'Image'),
        ('divider', 'Divider'),
        ('code', 'Code'),
    )

    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='blocks')
    type = models.CharField(max_length=20, choices=BLOCK_TYPES)
    content = models.TextField(blank=True, default='')
    props = models.JSONField(null=True, blank=True)
    order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.type} - {self.page.title}"