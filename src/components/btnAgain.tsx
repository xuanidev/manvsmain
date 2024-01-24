import React from "react";
import Image from "next/image";
import { BtnAgainProps } from "@/app/interfaces";
import replay from "../../public/icons/replay-icon.svg";
import "./btnAgain.css";

const BtnAgain: React.FC<BtnAgainProps> = ({
  loading,
  selected,
  nextQuestion,
  language,
}) => {
  return (
    <div
      className={`btnAgain ${loading ? "notActiveAgain" : ""}`}
      onClick={() => nextQuestion()}
    >
      <Image
        src={replay}
        width={50}
        height={50}
        style={{
          boxSizing: "border-box",
        }}
        alt="replay-button"
        className={`${selected ? "rotate" : ""}`}
      />
      <p className="again__text">
        {language === "es" ? "OTRA PREGUNTA" : "NEXT QUESTION"}
      </p>
    </div>
  );
};

export default BtnAgain;
