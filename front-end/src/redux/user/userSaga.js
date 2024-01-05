import {
    // registerUserService,
    loginUserService,
    logoutUserService,
    getLogedUserService,
  } from "./userService";
  import {
     getUserAction,
    loginUserAction,
    logoutUserAction,
     refreshAction,
     saveUserAction,
  } from "./userSlice";
  
  import { takeEvery, call, put } from "redux-saga/effects";
  
  function* loginUserGenerator({ payload }) {
    try {
      const response = yield call(loginUserService, payload);
      if (response) {
        payload.navigate("/student/");
        window.location.reload(false);
      } else {
        alert("Login Failed! Please Enter Valid Email & Password");
      }
    } catch (err) {
      alert("Login Failed! Please Enter Valid Email & Password");
    }
  }
  
  function* getLogedUserGenerator() {
    try {
      const response = yield call(getLogedUserService);
      if(response)
      yield put(saveUserAction(response));
    } catch (err) {
      console.log(err);
    }
  }
  
  function* logoutUserGenerator({ payload }) {
    try {
      const response = yield call(logoutUserService);
      if (response) {
        payload.navigate("/"); //logout location
        window.location.reload(false);
      } else {
        alert("Your Session is Expired");
        payload.navigate("/");
       
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  function* refreshGenerator() {
    try {
      const response = yield call(getLogedUserService);
      if(response)
      yield put(saveUserAction(response));
    } catch (err) {
      console.log(err);
    }
  }
  
  function* allUsers() {
   // yield takeEvery(registerUserAction, registerUserGenerator);
    yield takeEvery(loginUserAction, loginUserGenerator);
    yield takeEvery(getUserAction, getLogedUserGenerator);
    yield takeEvery(logoutUserAction, logoutUserGenerator);
    yield takeEvery(refreshAction, refreshGenerator);
  }
  
  export default allUsers;
  