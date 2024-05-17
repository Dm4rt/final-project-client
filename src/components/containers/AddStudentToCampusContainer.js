import { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, fetchAllStudentsThunk, addStudentToCampusThunk } from "../../store/thunks";
import AddStudentToCampusView from "../views/AddStudentToCampusView"; 

class AddStudentToCampusContainer extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.campusId);
    this.props.fetchAllStudents();
  }

  render() {
    return (
      <AddStudentToCampusView
        campus={this.props.campus}
        students={this.props.students}
        addStudentToCampus={this.props.addStudentToCampus}
      />
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
    students: state.allStudents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    addStudentToCampus: (campusId, student) =>
      dispatch(addStudentToCampusThunk(campusId, student)),
  };
};

export default connect(mapState, mapDispatch)(AddStudentToCampusContainer);

