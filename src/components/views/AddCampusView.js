import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AddCampusView = ({ addCampus }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const validateUrl = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageUrl && !validateUrl(imageUrl)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    const newCampus = { name, address, description, imageUrl };
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
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Add Campus</button>
      </form>
    </div>
  );
};

AddCampusView.propTypes = {
  addCampus: PropTypes.func.isRequired,
};

export default AddCampusView;

