from rest_framework.test import APITestCase
from rest_framework import status
from .models import Complaints
from .serializers import ComplaintsSerializer


class ComplaintsAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.complaint1 = Complaints.objects.create(title="Complaint 1", description="Description 1")
        self.complaint2 = Complaints.objects.create(title="Complaint 2", description="Description 2")
        self.valid_payload = {"title": "Updated Complaint", "description": "Updated Description"}
        self.invalid_payload = {"title": "", "description": "Updated Description"}

    def test_get_all_complaints(self):
        """Test retrieving all complaints"""
        response = self.client.get("/complaints/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_single_complaint_valid(self):
        """Test retrieving a single complaint with a valid ID"""
        response = self.client.get(f"/complaints/{self.complaint1.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.complaint1.title)

    def test_get_single_complaint_invalid(self):
        """Test retrieving a single complaint with an invalid ID"""
        response = self.client.get("/complaints/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_complaint_valid(self):
        """Test creating a complaint with valid data"""
        response = self.client.post("/complaints/", {"title": "New Complaint", "description": "New Description"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Complaints.objects.count(), 3)

    def test_create_complaint_invalid(self):
        """Test creating a complaint with invalid data"""
        response = self.client.post("/complaints/", {"title": "", "description": "New Description"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Complaints.objects.count(), 2)

    def test_update_complaint_valid(self):
        """Test updating a complaint with valid data"""
        response = self.client.put(f"/complaints/{self.complaint1.id}/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.title, self.valid_payload["title"])

    def test_update_complaint_invalid(self):
        """Test updating a complaint with invalid data"""
        response = self.client.put(f"/complaints/{self.complaint1.id}/", data=self.invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_complaint_valid(self):
        """Test deleting a complaint with a valid ID"""
        response = self.client.delete(f"/complaints/{self.complaint1.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Complaints.objects.count(), 1)

    def test_delete_complaint_invalid(self):
        """Test deleting a complaint with an invalid ID"""
        response = self.client.delete("/complaints/999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
