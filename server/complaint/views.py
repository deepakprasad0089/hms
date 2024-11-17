from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import *
from .serializers import *

# Authentication imports
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ComplaintView(APIView):

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        complaint = Complaints.objects.filter(pk=pk).first()
        if complaint:
            serializer = ComplaintsSerializer(complaint, many=False)
            return Response(serializer.data)
        else:
            return Response({"detail": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)

    
    
    def put(self, request, pk):
        complaint = Complaints.objects.get(pk=pk)

        serializer = ComplaintsSerializer(complaint, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        complaint = Complaints.objects.get(pk=pk)
        complaint.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

  
class ComplaintsView(APIView):

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        complaints = Complaints.objects.all()
        serializer = ComplaintsSerializer(complaints, many=True)
        return Response(data=serializer.data)
    

    def post(self, request):
        serializer = ComplaintsSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)