/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const CampusView = (props) => {
  const { campus, removeStudentFromCampus, deleteCampus } = props;
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
    setLoading(false);
  };

  const handleDeleteCampus = async () => {
    await deleteCampus(campus.id);
    history.push("/campuses"); // Redirect to all campuses after deletion
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Rendering CampusView with campus:", campus);

  const imageUrl = campus.imageUrl || 'https://clipart-library.com/2023/college-building-clipart-xl.png'; // This is the default image URL if the campus doesn't have one.

  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={imageUrl} alt={`${campus.name} campus`} style={{ width: '300px', height: '200px' }} />
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
              <button onClick={() => handleRemoveStudent(student.id)}>Remove Student</button>
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
      <button onClick={handleDeleteCampus}>Delete Campus</button>
    </div>
  );
};

export default CampusView;
