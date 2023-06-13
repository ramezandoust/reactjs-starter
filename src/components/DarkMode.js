import { useContext } from "react";
import "../styles/components/dark-mode.scss";

import { GlobalContext } from "../contexts/GlobalContext";

const DarkMode = () => {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const {
    globalState: { theme },
    globalDispatch,
  } = useContext(GlobalContext);

  const toggleTheme = (e) => {
    if (e.target.checked) {
      globalDispatch({
        type: "SET_THEME",
        payload: "dark",
      });
    } else {
      globalDispatch({
        type: "SET_THEME",
        payload: "light",
      });
    }
  };

  return (
    <label className="toggle-theme" htmlFor="checkbox">
      <input type="checkbox" id="checkbox" onChange={toggleTheme} defaultChecked={theme === "dark" || prefersDark ? true : false} />
      <div className="slider">
        <span className="iconBg">
          <i className={`fas ${theme === "light" ? "fa-sun" : "fa-moon"}`} />
        </span>
      </div>
    </label>
  );
};

export default DarkMode;
