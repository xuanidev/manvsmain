import React from "react";
import "./choicesBox.css";
import granite from "../../public/wall-4-light.png";
import { ChoicesBoxProps } from "@/app/interfaces";

const ChoicesBox: React.FC<ChoicesBoxProps> = ({
  loading,
  selected,
  onAnswerSelected,
  language,
}) => {
  return (
    <ul className="choices-box">
      <li
        className={`choice-option btnAnswer ${loading ? "notActive" : ""} ${
          selected ? "selected" : ""
        }`}
        style={{ backgroundColor: "hsl(160 57% 27% / 1)" }}
      >
        <div
          style={{ backgroundImage: `url(${granite.src})` }}
          className={`bg-granite`}
        ></div>
        <button
          className={`${loading ? "btnQuizNotActive" : "btnQuiz"}
          ${selected ? "cursor-default" : ""}  font-poppins ${
            selected ? "fontSelected" : ""
          }`}
          disabled={loading}
          onClick={() => onAnswerSelected(0)}
        >
          {language === "es" ? "SI" : "YES"}
        </button>
      </li>
      <li
        className={`choice-option btnAnswer ${loading ? "notActive" : ""} ${
          selected ? "selected" : ""
        }`}
        style={{ backgroundColor: "hsl(343 73% 30% / 1)" }}
      >
        <div
          style={{ backgroundImage: `url(${granite.src})` }}
          className={`bg-granite bg-granite-reverse`}
        ></div>
        <button
          className={`${loading ? "btnQuizNotActive" : "btnQuiz"}
          ${selected ? "cursor-default" : ""}  font-poppins ${
            selected ? "fontSelected" : ""
          }`}
          disabled={loading}
          onClick={() => onAnswerSelected(1)}
        >
          NO
        </button>
      </li>
    </ul>
  );
};

export default ChoicesBox;
