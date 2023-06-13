import { useContext } from "react";
import "../styles/components/footer.scss";
import { Text, LanguageContext } from "../contexts/LanguageContext";

const Footer = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="footer">
      <div><Text tid="designed"/> 2022 - {new Date().getFullYear()}</div>
      {/* <div>{dictionary.designed} 2022 - 2024</div> */}
    </div>
  );
};

export default Footer;
