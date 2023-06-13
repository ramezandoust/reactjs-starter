import { useContext, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";
import "../styles/components/header.scss";

import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Text } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { logOut } from "../contexts/ApiAction";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import DarkMode from "./DarkMode";

const Header = () => {
  const {
    globalState: { theme },
  } = useContext(GlobalContext);

  const {
    authState: { access_token },
    authDispatch,
  } = useContext(AuthContext);

  const handleClick = (el) => {
    try {
      document.querySelector(".nav-item.active")?.classList.remove("active");
    } catch (error) {
      // console.log(error);
    }
    el?.classList.add("active");
  };

  useLayoutEffect(() => {
    const path = window.location.pathname.split("/")[1] ? window.location.pathname.split("/")[1] : "/";
    const el = document.querySelector('.nav-item[data-path="' + path + '"]');
    handleClick(el);
  }, [window.location.pathname]);

  return (
    <div className="header">
      <Navbar bg="light" expand="md">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={theme === "light" ? logo : logoDark} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" style={{ maxHeight: "initial" }} navbarScroll>
              <Nav.Item onClick={(e) => handleClick(e.currentTarget, "/")} data-path="/">
                <Link to="/">
                  <Text tid="dashboard" />
                </Link>
              </Nav.Item>

              <Nav.Item onClick={(e) => handleClick(e.currentTarget, "/submit-test")} data-path="submit-test">
                <Link to="/submit-test">
                  <Text tid="test" />
                </Link>
              </Nav.Item>
            </Nav>

            <div className="nav-tools">
              <div className="theme-switcher">
                <DarkMode />
              </div>
              <div className="lang-switcher">
                <LanguageSelector />
              </div>

              <div className="auth">
                {!access_token ? (
                  <Nav.Item>
                    <Link to="/login">
                      <Text tid="login" />
                    </Link>
                  </Nav.Item>
                ) : (
                  <Nav.Item onClick={() => logOut(authDispatch)}>
                    <Text tid="logout" />
                  </Nav.Item>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
