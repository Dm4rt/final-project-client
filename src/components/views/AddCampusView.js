import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AddCampusView = ({ addCampus }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCampus = { name, address, description, imageUrl }; // Include image URL in the new campus data
    await addCampus(newCampus);
    history.push('/campuses'); // Redirect to campuses list
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
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> {/* New input field for image URL */}
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


