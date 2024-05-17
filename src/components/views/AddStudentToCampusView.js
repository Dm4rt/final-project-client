import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AddStudentToCampusView = (props) => {
  const { campus, students, addStudentToCampus } = props;
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [newStudent, setNewStudent] = useState({
    firstname: "",
    lastname: "",
    email: "",
    imageUrl: "",
    gpa: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleExistingStudentChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleNewStudentChange = (event) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value,
    });
  };

  const validateUrl = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate image URL
    if (newStudent.imageUrl && !validateUrl(newStudent.imageUrl)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    const studentToAdd = {
      ...newStudent,
      campusId: campus.id,
      gpa: parseFloat(newStudent.gpa) || 0.0 // Ensure GPA is a number
    };

    if (selectedStudentId) {
      await addStudentToCampus(campus.id, { id: selectedStudentId });
    } else {
      await addStudentToCampus(campus.id, studentToAdd);
    }
    history.push(`/campus/${campus.id}`);
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
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleNewStudentChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={newStudent.imageUrl}
            onChange={handleNewStudentChange}
          />
        </label>
        <br />
        <label>
          GPA:
          <input
            type="number"
            step="0.01"
            name="GPA"
            value={newStudent.GPA}
            onChange={handleNewStudentChange}
            min="0"
            max="4"
          />
        </label>
        <br />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Add Student</button>
      </form>
      <Link to={`/campus/${campus.id}`}>
        <button>Back to Campus</button>
      </Link>
    </div>
  );
};

export default AddStudentToCampusView;

