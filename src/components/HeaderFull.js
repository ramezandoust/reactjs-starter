import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import "../styles/components/header-full.scss";

import LanguageSelector from "./LanguageSelector";
import { GlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import DarkMode from "./DarkMode";

const HeaderFull = () => {
  const {
    globalState: { theme },
  } = useContext(GlobalContext);

  return (
    <div className="header-full">
      <Navbar bg="light" expand="md">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={theme === "light" ? logo : logoDark} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="nav-tools">
              <div className="theme-switcher">
                <DarkMode />
              </div>
              <div className="lang-switcher">
                <LanguageSelector />
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderFull;
