import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseurl from "../../config";

const UpdateComplaint = () => {
  const navigate = useNavigate();
  const { complaintId } = useParams(); // To get the complaint ID from the URL

  // State for the required fields
  const [status, setStatus] = useState("pending");

  // Fetch complaint data on component mount
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
        setStatus(data.status);  // Set the existing status of the complaint
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaintData();
  }, [complaintId]);

  // Data to be sent in the update request
  const data = {
    status: status, // Only update the status
  };

  // Function to update the complaint
  const updateComplaint = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PATCH", // Use PATCH for partial update
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Navigate to the complaints page after successful update
      navigate("/complaints/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bill__container">
      <div className="profile_header">
        <h1>Update Complaint</h1>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        updateComplaint(`${baseurl}/complaints/${complaintId}/`, data);
      }}>
        <table className="information_table">
          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "60%" }} />
          </colgroup>

          <tbody>
            <tr>
              <th>Fields</th>
              <th>Values</th>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update Complaint</button>
      </form>
    </div>
  );
};

export default UpdateComplaint;
