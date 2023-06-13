import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/not-found.scss";

import { Text } from "../contexts/LanguageContext";

const NotFound = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setTimer((prev) => {
        return prev - 1;
      });
    }, 1000);

    if (timer === 0) {
      clearTimeout(timeOut);
      navigate("/");
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [timer]);

  return (
    <div className="not-found">
      <h1 className="heading">
        4<span className="not-found-zero">0</span>4
      </h1>
      <span className="desc">
        <Text tid="page-was-not-found" />
      </span>
      <Button
        variant="outline-light"
        onClick={() => {
          navigate("/");
        }}
        className="mt-4"
      >
        <Text tid="go-home" /> <span> {timer} </span>
      </Button>
    </div>
  );
};

export default NotFound;
