import React from "react";
import "./language-icon.css";
import Image from "next/image";
import ukIcon from "../../public/icons/ukIcon.svg";
import spainIcon from "../../public/icons/spainIcon.svg";
import { LanguageIcon } from "@/app/interfaces";

const LanguageSelector: React.FC<LanguageIcon> = ({
  language,
  setLanguage,
}) => {
  const getIconSrc = () => {
    switch (language) {
      case "es":
        return ukIcon;
      case "en":
        return spainIcon;
      default:
        return ukIcon;
    }
  };

  const handleIconClick = () => {
    switch (language) {
      case "en":
        setLanguage("es");
        break;
      case "es":
        setLanguage("en");
        break;
      // More
      default:
        setLanguage("en");
        break;
    }
  };

  return (
    <div className="language">
      <Image
        src={getIconSrc()}
        width={40}
        height={40}
        style={{
          boxSizing: "border-box",
        }}
        alt="language-icon"
        className=""
        onClick={handleIconClick}
      />
    </div>
  );
};

export default LanguageSelector;
