import React from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import baseurl from "../../config";

import AddIcon from "../../assets/icons/addnormal.svg";
import AddIconHover from "../../assets/icons/add.svg";

const Complaints = () => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const iconSource = isHovered ? AddIconHover : AddIcon;

  const { data: complaints, loading, error } = useFetch(`${baseurl}/complaints/`);

  if (error) return <div>Something went wrong: {error}</div>;

  return (
    <div className="complaints__container">
      <div className="profile_header">
        <h1>Complaints</h1>
        <img
          src={iconSource}
          alt="Add Complaint"
          title="Add Complaint"
          onClick={() => navigate('/complaints/add')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      <table className="table__container">
        <colgroup>
          <col style={{ width: "50px" }} />
          <col style={{ width: "calc(100% - 275px)" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "125px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Complaint No.</th>
            <th>Title</th>
            <th>Student Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            complaints?.map((complaint, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
            onClick={() =>
              complaint.id
                ? navigate(`/complaints/${complaint.id}`)
                : console.log(complaint)
            }
          >
                  
                  {complaint.id}
                </td>
                <td >
                  {complaint.title}
                </td>
                <td>{complaint.student_name}</td>
                <td>{complaint.status === "resolved" ? "Resolved" : "Pending"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Complaints;
