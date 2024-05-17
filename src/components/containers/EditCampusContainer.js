import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";

class EditCampusContainer extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
  }

  render() {
    return (
      <EditCampusView 
        campus={this.props.campus}
        fetchCampus={this.props.fetchCampus}
        editCampus={this.props.editCampus}
      />
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (id, campus) => dispatch(editCampusThunk(id, campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);

