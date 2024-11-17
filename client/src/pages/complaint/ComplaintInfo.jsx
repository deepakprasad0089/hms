import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import baseurl from "../../config";

const ComplaintInfo = () => {
  const { complaintId } = useParams(); // Extract the complaint ID from the URL

  // State to store complaint details
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch complaint details when component is mounted
  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch(`${baseurl}/complaints/${complaintId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch complaint data");
        }

        const data = await response.json();
        setComplaint(data); // Set the fetched complaint data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintData();
  }, [complaintId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!complaint) {
    return <div>No data available</div>;
  }

  return (
    <div className="bill__container">
      <div className="profile_header">
        <h1>Complaint Details</h1>
      </div>
      <table className="information_table">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "60%" }} />
        </colgroup>
        <tbody>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <th>Complaint ID</th>
            <td>{complaint.id}</td>
          </tr>
          <tr>
            <th>Student</th>
            <td>{complaint.student}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{complaint.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{complaint.description}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{complaint.status}</td>
          </tr>
          <tr>
            <th>Date Created</th>
            <td>{new Date(complaint.created_at).toLocaleString()}</td>
          </tr>
          {complaint.updated_at && (
            <tr>
              <th>Last Updated</th>
              <td>{new Date(complaint.updated_at).toLocaleString()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintInfo;
