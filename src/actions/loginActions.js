import axios from "axios";

// Register
export const registerAction = (user) => async (dispatch) => {
  // sending request to rest api
  const result = await axios.post(
    "http://localhost:8081/employee/add/dto",
    user
  );
  console.log(result);
  console.log(result.data);
  // dispatch an action to store with payload using rest api response
  dispatch({
    type: "REGISTER",
    payload: result.data,
  });
};

export const loginAction = (user) => (dispatch) => {
  axios
    .post("http://localhost:8081/login", user)
    .then((res) => {
      console.log(res);
      localStorage.setItem('User', JSON.stringify(res.data));
      // dispatch an action
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      dispatch({
        type: "ERR_RES",
        payload: error.response.data.message,
      });
    });
};

// logout action
export const logoutAction = (email) => async (dispatch) => {
  axios
    .get(`http://localhost:8081/logout/${email}`)
    .then((res) => {
      dispatch({
        type: "LOGOUT",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "ERR_RES",
        payload: err.response.data.message,
      });
    });
};