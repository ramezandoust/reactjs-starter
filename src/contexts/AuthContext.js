import { createContext, useReducer, useLayoutEffect } from "react";
import { getAccessToken } from "../utils/GlobalUtil";
const cookie_accessToken = getAccessToken();
let access_token = cookie_accessToken ? cookie_accessToken : "";
let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

// create AuthContext
const AuthContext = createContext();

// initial state
const initialState = {
  access_token: "" || access_token,
  user: null || user,
};

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, access_token: action.payload };

    case "USER":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, access_token: "", user: null };

    default:
      return state;
  }
};

// AuthContext provider
const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(rootReducer, initialState);

  // useLayoutEffect - payload user from local storage to state on refresh page
  useLayoutEffect(() => {
    const data = {
      access_token: cookie_accessToken ? cookie_accessToken : "",
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    };

    authDispatch({
      type: "LOGIN",
      payload: data.access_token,
    });
    authDispatch({
      type: "USER",
      payload: data.user,
    });
  }, []);

  return <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
