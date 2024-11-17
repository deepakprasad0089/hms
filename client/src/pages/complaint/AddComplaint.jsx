import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../../config";

const AddComplaint = () => {
  const navigate = useNavigate();

  // State for the required fields
  const [student, setStudent] = useState("");  // Assuming student ID or name as a string
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); // Default value for status

  const data = {
    student: student,
    title: title,
    description: description,
    status: status,
  };

  const addData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/complaints/");  // Assuming after adding it redirects to complaints page
    }
  };

  return (
    <div className="bill__container">
      <div className="profile_header">
        <h1>Add Complaint</h1>
      </div>
      <form onSubmit={() => addData(`${baseurl}/complaints/`, data)}>
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
              <th>Student</th>
              <td>
                <input
                  type="text"
                  placeholder="Enter student name or ID"
                  onChange={(e) => setStudent(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Title</th>
              <td>
                <input
                  type="text"
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <textarea
                  maxLength={20}
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Add Complaint</button>
      </form>
    </div>
  );
};

export default AddComplaint;
