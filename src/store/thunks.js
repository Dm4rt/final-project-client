/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
const axios = require('axios');

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

//Add Campus
// THUNK CREATOR:
export const addCampusThunk = (campus) => async (dispatch) => { // The THUNK
   try {
     const response = await axios.post("/api/campuses", campus);
     dispatch(ac.addCampus(response.data)); 
   } catch (error) {
     console.error("Error adding campus:", error);
   }
};
//Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = (campusId) => async (dispatch) => { // The THUNK
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(ac.deleteCampus(campusId)); 
  } catch (error) {
    console.error("Error deleting campus:", error);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get a student data (based on "id")from database
    let res = await axios.get(`/api/campuses/${id}`);  
    dispatch(ac.fetchCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

//Add Student to Campus
export const addStudentToCampusThunk = (campusId, student) => async (dispatch) => {
  try {
    if (student.id) {
      // Update existing student's campus
      await axios.put(`/api/students/${student.id}`, { campusId });
    } else {
      // Add new student with campusId
      await axios.post(`/api/students`, { ...student, campusId });
    }
    dispatch(ac.fetchCampus(campusId)); // Refresh data
  } catch (error) {
    console.error("Error adding student to campus:", error);
  }
};

//Delete Student from Campus and Recreate
//New approach because this bug has been bothering me for the past week
export const removeStudentFromCampusThunk = (campusId, studentId) => async (dispatch) => {
  try {
    // Fetch the student data
    const studentRes = await axios.get(`/api/students/${studentId}`);
    const studentData = studentRes.data;

    // Delete the student
    await axios.delete(`/api/students/${studentId}`);

    // Recreate the student without the campus
    const { id, campusId: _, ...studentWithoutCampus } = studentData;  // Literally copy all info to a new student except campusId
    await axios.post(`/api/students`, studentWithoutCampus);

    // Fetch the updated campus data
    dispatch(ac.fetchCampus(campusId));
  } catch (error) {
    console.error("Error removing student from campus:", error);
  }
};

//Edit a Campus
export const editCampusThunk = (id, campus) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/campuses/${id}`, campus);
    dispatch(ac.fetchCampus(res.data)); 
  } catch (err) {
    console.error("Error editing campus:", err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } catch(err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, student);  
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch(err) {
    console.error(err);
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = studentId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`/api/students/${studentId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch(err) {
    console.error(err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = (id, student) => async (dispatch) => { // THE NEW THUNK LOL
  try {
    let response = await axios.put(`/api/students/${id}`, student);
    dispatch(ac.editStudent(response.data));
  } catch (err) {
    console.error(err);
  }
};


// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = id => async dispatch => {  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);  
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data 
    dispatch(ac.fetchStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};
