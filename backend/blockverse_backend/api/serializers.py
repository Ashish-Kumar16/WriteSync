from rest_framework import serializers
from .models import Page, Block, User

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ['id', 'type', 'content', 'props', 'order', 'created_at', 'updated_at']

class PageSerializer(serializers.ModelSerializer):
    blocks = BlockSerializer(many=True, read_only=True)
    
    class Meta:
        model = Page
        fields = ['id', 'title', 'emoji', 'blocks', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name']