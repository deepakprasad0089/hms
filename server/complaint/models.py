from django.db import models
from profiles.models import Students

# Create your models here.


class Complaints(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    description = models.TextField(max_length=20)
    status = models.CharField(max_length=20, choices=[("pending", "Pending"), ("resolved", "Resolved")])


    def __str__(self):
        return f"{self.student.name} - {self.title} - {self.status}"



