import React, { useState, createContext, useContext, useLayoutEffect, useEffect } from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { languageOptions, dictionaryList } from "../languages";

// create context
const LanguageContext = createContext();

// context provider
function LanguageProvider({ children }) {
  const [direction, setDirection] = useState("ltr");
  const [userLanguage, setUserLanguage] = useState("en");
  const dictionary = dictionaryList[userLanguage];

  const getText = (tid) => {
    return dictionary[tid] || tid;
  };

  const userLanguageChange = (selected) => {
    const newLanguage = languageOptions[selected] ? selected : "en";
    setUserLanguage(newLanguage);
    localStorage.setItem("site-lang", newLanguage);
  };

  useLayoutEffect(() => {
    const isLang = localStorage.getItem("site-lang") ? localStorage.getItem("site-lang") : "en";
    setUserLanguage(isLang);
  }, []);

  useEffect(() => {
    if (userLanguage === "ar" || userLanguage === "fa") {
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  }, [userLanguage]);

  return (
    <LanguageContext.Provider value={{ userLanguage, dictionary, userLanguageChange, getText }}>
      <ThemeProvider dir={direction}>{children}</ThemeProvider>
    </LanguageContext.Provider>
  );
}
export { LanguageContext, LanguageProvider };

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid] || tid;
}
