import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const EditStudentView = ({ student, fetchStudent, editStudent, campuses }) => {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    imageUrl: '',
    campusId: '',
    GPA: ''
  });

  const history = useHistory();

  useEffect(() => {
    if (student) {
      setFormState({
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        imageUrl: student.imageUrl || '',
        campusId: student.campusId || '',
        GPA: student.GPA || ''
      });
    }
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editStudent(student.id, formState); // Ensure student.id is correctly passed
    history.push(`/student/${student.id}`);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formState.firstname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formState.lastname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Campus:
          <select
            name="campusId"
            value={formState.campusId}
            onChange={handleChange}
          >
            <option value="">Select Campus</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          GPA:
          <input
            type="number"
            step="0.1"
            name="GPA"
            value={formState.GPA}
            onChange={handleChange}
            min="0"
            max="4"
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditStudentView;

