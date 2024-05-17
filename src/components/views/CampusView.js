/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CampusView = (props) => {
  const { campus, removeStudentFromCampus } = props; 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (campus && Array.isArray(campus.students)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [campus]);

  const handleRemoveStudent = async (studentId) => {
    setLoading(true);
    await removeStudentFromCampus(campus.id, studentId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Rendering CampusView with campus:", campus);

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
      <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit Campus</button>
      </Link>
    </div>
  );
};

export default CampusView;

