import { useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";

import { LanguageContext } from "../../contexts/LanguageContext";

const Recaptcha = ({ setRecatchaToken }) => {
  const captchaRef = useRef();
  const { userLanguage } = useContext(LanguageContext);

  const [siteKey] = useState("6LeJfOkgAAAAAIXufLRoyoaJREhF-Yibe2cqGyTu");
  const [currentTheme] = useState(localStorage.getItem("theme") || "light");

  function onChange(value) {
    if (value) {
      setRecatchaToken(value);
    }
  }

  const reset = (msg) => {
    const el = captchaRef.current;
    el.reset();
    setRecatchaToken("");
    toast.error(msg);
  };

  return (
    <>
      <ReCAPTCHA
        className="g-captcha"
        sitekey={siteKey}
        onChange={onChange}
        onExpired={() => {
          reset("Captcha has expired, try again");
        }}
        onError={() => {
          reset("Captcha has error, somthing wrong");
        }}
        ref={captchaRef}
        style={{ display: "flex", justifyContent: "center", marginTop: "0.2rem" }}
        theme={currentTheme === "light" ? "light" : "dark"}
        hl={userLanguage}
      />
    </>
  );
};

export default Recaptcha;
