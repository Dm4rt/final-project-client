/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const NewStudentView = (props) => {
  const { handleChange, handleSubmit, campuses } = props;
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  
  //Making sure input is an email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  //Making sure the link is an actual link
  const validateUrl = (url) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const validateGPA = (GPA) => {
    const numGPA = parseFloat(GPA);
    return numGPA >= 0 && numGPA <= 4 && Number.isFinite(numGPA);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const imageUrl = e.target.imageUrl.value;
    const GPA = e.target.GPA.value;

    if (email && !validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (imageUrl && !validateUrl(imageUrl)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    if (GPA && !validateGPA(GPA)) {
      setErrorMessage("Please enter a GPA between 0 and 4, in steps of 0.01.");
      return;
    }

    setErrorMessage("");
    handleSubmit(e);
  };

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
              Add a Student
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={handleFormSubmit}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
            <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
            <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
            <input type="email" name="email" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
            <input type="text" name="imageUrl" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus: </label>
            <select name="campusId" onChange={(e) => handleChange(e)}>
              <option value="">Select a campus</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
            <input type="number" step="0.01" name="GPA" min="0" max="4" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudentView;

