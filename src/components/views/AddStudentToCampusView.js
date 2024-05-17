import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddStudentToCampusView = (props) => {
  const { campus, students, addStudentToCampus } = props;
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [newStudent, setNewStudent] = useState({ firstname: "", lastname: "" });

  const handleExistingStudentChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleNewStudentChange = (event) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedStudentId) {
      addStudentToCampus(campus.id, { id: selectedStudentId });
    } else {
      addStudentToCampus(campus.id, newStudent);
    }
  };

  return (
    <div>
      <h1>Add Student to {campus.name}</h1>
      <form onSubmit={handleSubmit}>
        <h2>Select Existing Student</h2>
        <select value={selectedStudentId} onChange={handleExistingStudentChange}>
          <option value="">Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.firstname} {student.lastname}
            </option>
          ))}
        </select>
        <h2>Or Add New Student</h2>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={newStudent.firstname}
            onChange={handleNewStudentChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={newStudent.lastname}
            onChange={handleNewStudentChange}
          />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
      <Link to={`/campus/${campus.id}`}>
        <button>Back to Campus</button>
      </Link>
    </div>
  );
};

export default AddStudentToCampusView;

