/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

const CampusView = (props) => {
  const { campus, removeStudentFromCampus } = props; // Destructure props to include removeStudentFromCampus

  // Ensure campus and campus.students are defined
  if (!campus || !campus.students) {
    return <div>Loading...</div>;
  }

  const handleRemoveStudent = (studentId) => {
    removeStudentFromCampus(campus.id, studentId);
  };

  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.length === 0 ? (
        <p>No students enrolled in campus</p>
      ) : (
        campus.students.map(student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => handleRemoveStudent(student.id)}>Remove</button>
            </div>
          );
        })
      )}

      <Link to={`/campus/${campus.id}/add-student`}>
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default CampusView;
