import { createContext, useReducer, useLayoutEffect } from "react";
let theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";

// create Context
const GlobalContext = createContext();

// initial state
const initialState = {
  theme: theme || "light",
};

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      localStorage.setItem("theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

// Context provider
const GlobalProvider = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(rootReducer, initialState);

  // useLayoutEffect - payload user from local storage to state on refresh page
  useLayoutEffect(() => {
    const local_theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";

    globalDispatch({
      type: "SET_THEME",
      payload: local_theme,
    });
  }, []);

  return <GlobalContext.Provider value={{ globalState, globalDispatch }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
