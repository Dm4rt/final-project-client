import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const EditCampusView = ({ campus, fetchCampus, editCampus }) => {
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: '' // Initialize imageUrl in form state
  });

  const history = useHistory();

  useEffect(() => {
    if (campus) {
      setFormState({
        name: campus.name,
        address: campus.address,
        description: campus.description,
        imageUrl: campus.imageUrl || '' // Set imageUrl from campus data or empty string if not present
      });
    }
  }, [campus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editCampus(campus.id, formState);
    history.push(`/campus/${campus.id}`);
  };

  if (!campus) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Campus</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formState.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formState.imageUrl} // Access imageUrl from formState
            onChange={handleChange} // Use handleChange to update formState
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCampusView;

