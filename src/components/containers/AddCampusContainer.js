import React from "react";
import { connect } from "react-redux";
import { addCampusThunk } from "../../store/thunks";
import AddCampusView from "../views/AddCampusView";

const AddCampusContainer = (props) => {
  return <AddCampusView addCampus={props.addCampus} />;
};

const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  };
};

export default connect(null, mapDispatch)(AddCampusContainer);

