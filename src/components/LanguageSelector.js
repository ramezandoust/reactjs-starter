import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { languageOptions } from "../languages";
import { LanguageContext } from "../contexts/LanguageContext";

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  // set selected language by calling context method
  const handleLanguageChange = (e) => {
    userLanguageChange(e.target.value);
  };

  useEffect(() => {
    const styleCdn = {
      bootstrap: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
      bootstrap_rtl: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.rtl.min.css",
    };

    let htmlNode = document.querySelector("html");
    let btNode = document.head.querySelector("#bootstrap");

    if (userLanguage === "fa") {
      htmlNode.setAttribute("lang", "fa");
      htmlNode.setAttribute("dir", "rtl");
      btNode.setAttribute("href", styleCdn.bootstrap_rtl);
    } else if (userLanguage === "ar") {
      htmlNode.setAttribute("lang", "ar");
      htmlNode.setAttribute("dir", "rtl");
      btNode.setAttribute("href", styleCdn.bootstrap_rtl);
    } else {
      htmlNode.setAttribute("lang", "en");
      htmlNode.setAttribute("dir", "ltr");
      btNode.setAttribute("href", styleCdn.bootstrap);
    }
  }, [userLanguage]);

  return (
    <Form.Select size="sm" onChange={handleLanguageChange} value={userLanguage} style={{ width: "10em" }}>
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </Form.Select>
  );
}
