/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React from 'react';
import { Link } from 'react-router-dom';

const StudentView = (props) => {
  const { student } = props;

  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <p>
        <img src={student.imageUrl} alt="Student" style={{ width: '300px', height: '200px' }} />
      </p>
      <p>
        <strong>GPA:</strong> {student.GPA}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      
      {student.campus ? (
        <h3>
          <Link to={`/campus/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        </h3>
      ) : (
        <h3>No campus assigned</h3>
        
      )}
      
      <Link to={`/student/${student.id}/edit`}>
        <button>Edit Student</button>
      </Link>
    </div>
  );
};

export default StudentView;


