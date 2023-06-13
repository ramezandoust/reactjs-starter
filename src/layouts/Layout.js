import { useLayoutEffect, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/layout.scss";

import Header from "../components/Header";
import HeaderFull from "../components/HeaderFull";
import Footer from "../components/Footer";
import { logOut } from "../contexts/ApiAction";
import { AuthContext } from "../contexts/AuthContext";

export const Layout = ({ children, type }) => {
  const location = useLocation();
  const layoutRef = useRef();

  const {
    authState: { access_token },
    authDispatch,
  } = useContext(AuthContext);

  useLayoutEffect(() => {
    layoutRef.current.classList.add("fade-in");
    setTimeout(() => {
      layoutRef.current.classList.remove("fade-in");
    }, 510);
  }, [location.pathname]);
  
  // useEffect(() => {
  //   if (navigator.userAgent.indexOf("Firefox") <= 0) {
  //     window.cookieStore.addEventListener("change", ({ changed }) => {
  //       for (const item of changed) {
  //         if (access_token && item.value !== access_token) {
  //           logOut(authDispatch);
  //         }
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div className={`layout${type ? " " + type : ""}`} ref={layoutRef}>
      {type === "full-page" ? (
        <>
          <HeaderFull />
          <main>{children}</main>
        </>
      ) : (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
};
