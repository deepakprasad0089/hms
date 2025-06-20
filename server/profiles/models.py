from django.db import models
from rooms.models import Room



class Students(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    aadhar_number = models.CharField(max_length=100)
    cast = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=20)
    hostel_room_number = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True, to_field="room_number")

    blood_group = models.CharField(max_length=10)

    allergies = models.JSONField(default=list) 
    fees_payment_details = models.JSONField(default=list)

    def __str__(self):
        return self.name
    

class Cleaners(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    aadhar_number = models.CharField(max_length=100)
    cast = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=20)
    salary = models.FloatField()

    acc_number = models.CharField(max_length=20, blank=True)
    ifsc_code = models.CharField(max_length=20, blank=True)
    acc_holder_name = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name


class Cooks(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    aadhar_number = models.CharField(max_length=100)
    cast = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=20)
    salary = models.FloatField()
    experience = models.TextField(max_length=20)

    acc_number = models.CharField(max_length=20, blank=True)
    ifsc_code = models.CharField(max_length=20, blank=True)
    acc_holder_name = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name
    

class Guards(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    aadhar_number = models.CharField(max_length=100)
    cast = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=20)
    salary = models.FloatField()
    experience = models.TextField(max_length=20)
    shift_start = models.TimeField()
    shift_end = models.TimeField()

    acc_number = models.CharField(max_length=20, blank=True)
    ifsc_code = models.CharField(max_length=20, blank=True)
    acc_holder_name = models.CharField(max_length=20, blank=True)

    def __str__(self) -> str:
        return self.name