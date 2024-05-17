import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentThunk, editStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';
import EditStudentView from '../views/EditStudentView';

class EditStudentContainer extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <EditStudentView
        student={this.props.student}
        editStudent={this.props.editStudent}
        fetchStudent={this.props.fetchStudent}
        campuses={this.props.campuses}
      />
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
    campuses: state.allCampuses
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (id, student) => dispatch(editStudentThunk(id, student)),
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);

