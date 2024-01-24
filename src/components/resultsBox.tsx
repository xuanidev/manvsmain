import React from "react";
import "./resultsBox.css";
import granite from "../../public/subtle-grunge.png";
import { ResultsBoxProps } from "@/app/interfaces";

const ResultsBox: React.FC<ResultsBoxProps> = ({
  selected,
  votes,
  percentage,
  currentVotes,
}) => {
  return (
    <div className="result-content" style={{ gap: !selected ? "0px" : "16px" }}>
      <div
        className="result-content__top"
        style={{
          padding: !selected ? "0px" : "",
          border: !selected ? "none" : "",
          height: !selected ? "0px" : "auto",
          opacity: !selected ? "0px" : "auto",
        }}
      >
        <ul className="results-box" style={{ height: "150px" }}>
          <li className="result-option">
            <div
              style={{
                height: `${votes[0]}px`,
                backgroundColor: "hsl(160 57% 27% / 1)",
                border: `${isNaN(votes[0]) || votes[0] == 0 ? "none" : ""}`,
              }}
              className="bg-result"
            >
              <div
                className="bg-bar"
                style={{
                  backgroundImage: `url(${granite.src})`,
                  opacity: "1",
                  filter: "brightness(110%)",
                  height: !selected ? "0px" : "100%",
                }}
              ></div>
            </div>
          </li>
          <li className={`result-option`}>
            <div
              style={{
                height: `${votes[1]}px`,
                backgroundColor: "hsl(343 73% 30% / 1)",
                border: `${isNaN(votes[1]) || votes[1] == 0 ? "none" : ""}`,
              }}
              className="bg-result"
            >
              <div
                className="bg-bar"
                style={{
                  backgroundImage: `url(${granite.src})`,
                  backgroundPosition: "center",
                  opacity: "60%",
                  filter: "brightness(110%)",
                  height: !selected ? "0px" : "100%",
                }}
              ></div>
            </div>
          </li>
        </ul>
      </div>
      <ul
        className="votes-box"
        style={{
          backgroundImage: `url(${granite.src})`,
          height: !selected ? "0px" : "",
          padding: !selected ? "0px" : "",
          border: !selected ? "none" : "",
          opacity: !selected ? "0" : "1",
          display: !selected ? "none" : "flex",
          marginBottom: !selected ? "0px" : "",
        }}
      >
        <div className="totalQuiz">
          <div className="resultQuiz__percentage">
            {`${!isNaN(votes[0]) ? Math.ceil(votes[0]) : 0}`}
            <span className="resultQuiz__decimal">{`.${(
              votes[0].toString().split(".")[1] || ""
            ).slice(0, 2)}%`}</span>
          </div>
          <div className="resultQuiz__votes">{`${
            percentage[0] ? percentage[0] : 0
          } / ${currentVotes + 1}`}</div>
        </div>
        <div className="totalQuiz">
          <div className="resultQuiz__percentage">
            {`${!isNaN(votes[1]) ? Math.ceil(votes[1]) : 0}`}
            <span className="resultQuiz__decimal">{`.${(
              votes[0].toString().split(".")[1] || ""
            ).slice(0, 2)}%`}</span>
          </div>
          <div className="resultQuiz__votes">{`${
            percentage[1] ? percentage[1] : 0
          } / ${currentVotes + 1} votos `}</div>
        </div>
      </ul>
    </div>
  );
};

export default ResultsBox;
