/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.campus ? (
        <h3>{student.campus.name}</h3>
      ) : (
        <h3>No campus assigned</h3>
      )}
    </div>
  );
};

export default StudentView;
