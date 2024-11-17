from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *



class ComplaintsSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.name", read_only=True)

    class Meta:
        model = Complaints
        fields = ['id', 'title', 'description', 'status', 'student', 'student_name']
