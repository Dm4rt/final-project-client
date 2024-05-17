import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AddCampusView = ({ addCampus }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description,setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCampus = { name, address, description };
    await addCampus(newCampus);
    history.push('/campuses'); // redirect to campuses list
  };

  return (
    <div>
      <h1>Add New Campus</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Add Campus</button>
      </form>
    </div>
  );
};

AddCampusView.propTypes = {
  addCampus: PropTypes.func.isRequired,
};

export default AddCampusView;

