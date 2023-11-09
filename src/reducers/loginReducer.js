const initialState = {
  employee: {},
  user: {},
  errMsg: "",
};

export const loginReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case "REGISTER":
      return { ...state, employee: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "ERR_RES":
      return { ...state, errMsg: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};