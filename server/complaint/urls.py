from django.urls import path
from .views import *

urlpatterns = [
    path('<int:pk>/', ComplaintView.as_view(), name="complaint-operations"),
    path('', ComplaintsView.as_view(), name="get-single-complaint-details")
]