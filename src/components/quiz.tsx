"use client";
import { useState, useEffect } from "react";
import {
  defaultQuestion,
  getQuestions,
  getVotes,
  postVote,
} from "../app/api/api";
import {
  QuizProps,
  QuizQuestion,
  QuizVotes,
  QuizQuestionString,
  QuizQuestionStringArray,
  serializeQuestions,
  serializeVotes,
} from "../app/interfaces";
import "./quiz.css";
import localFont from "next/font/local";

import BtnAgain from "./btnAgain";
import ImagesBox from "./imagesBox";
import ChoicesBox from "./choicesBox";
import ResultsBox from "./resultsBox";

const myFont = localFont({ src: "../../public/fonts/ZTRavigsfen-Regular.otf" });

const scrollToBottom = () => {
  setTimeout(() => {
    const element = document.getElementById("bottom");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, 600);
};

const Quiz: React.FC<QuizProps> = ({ loading, setLoading, language }) => {
  const [selected, setSelected] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(1);
  const [currentVotes, setCurrentVotes] = useState(1);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [question, setQuestion] = useState(
    "Le ganarias a un leon en un combate"
  );
  const [src, setSrc] = useState("/questions/lion.jpg");
  const [votes, setVotes] = useState<number[]>([0, 0]);
  const [percentage, setPercentage] = useState<number[]>([50, 50]);
  const [voted, setVoted] = useState<number[]>([]);

  const createVotes = (votesResult: QuizVotes[]) => {
    const totalVotes: QuizVotes[] = serializeVotes(votesResult);
    setCurrentVotes(totalVotes[0].totalVotes);
    const delayedVotesUpdate = () => {
      let votes = [totalVotes[0].yes, totalVotes[0].no];
      setVotes(votes);
    };
    setTimeout(delayedVotesUpdate, 1200);
  };

  const generateRandomQuestionId = async (voted: number[]) => {
    const availableQuestions = questions.map((question) => question.id);
    const remainingQuestions = availableQuestions.filter(
      (questionId) => !voted.includes(questionId)
    );
    let questionsGet: QuizQuestion[] = [];
    let votesGet: QuizVotes[] = [];
    let indexOfSelectedQuestion = 0;
    if (remainingQuestions.length === 0) {
      try {
        setLoading(true);
        let { questionsResult, allVisited } = await getQuestions(voted);
        if (allVisited) {
          localStorage.setItem("voted", "");
          setVoted([]);
        }
        if (!questionsResult) {
          questionsResult = defaultQuestion;
        }
        questionsGet = serializeQuestions(questionsResult);
        let ranIndex = Math.floor(Math.random() * questionsGet.length);
        let id = questionsGet[ranIndex].id;
        let newValueCurrentAnswer = currentAnswer;
        if (id && id !== 1) {
          newValueCurrentAnswer = id;
          setCurrentAnswer(id);
        }
        indexOfSelectedQuestion = questionsGet.findIndex(
          (question) => question.id === id
        );
        const votesResult = await getVotes(newValueCurrentAnswer);
        if (questionsResult && votesResult) {
          createVotes(votesResult);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const randomQuestionId = remainingQuestions[randomIndex];
      indexOfSelectedQuestion = questions.findIndex(
        (question) => question.id === randomQuestionId
      );
      const votesResult = await getVotes(randomQuestionId);
      votesGet = serializeVotes(votesResult);
      createVotes(votesGet);

      return { randomNumber: indexOfSelectedQuestion, result: questions };
    }
    return { randomNumber: indexOfSelectedQuestion, result: questionsGet };
  };

  useEffect(() => {
    let storedData = localStorage.getItem("voted");
    let storedDataAux = storedData ? JSON.parse(storedData) : [];
    setVoted(storedData ? JSON.parse(storedData) : []);
    const fetchData = async () => {
      let { randomNumber, result } = await generateRandomQuestionId(
        storedDataAux
      );
      setQuestions(result);
      if (result != questions) {
        setQuestion(result[randomNumber].question__es);
        setSrc(result[randomNumber].img);
      } else {
        setQuestion(questions[randomNumber].question__es);
        setSrc(questions[randomNumber].img);
      }
      setSelected(false);
      setCurrentAnswer(randomNumber);
    };
    fetchData().catch(console.error);
  }, []);
  useEffect(() => {
    if (questions.length > 0 && currentAnswer) {
      setQuestion(
        language === "es"
          ? questions[currentAnswer].question__es
          : questions[currentAnswer].question__en
      );
    }
  }, [language]);

  const nextQuestion = async () => {
    setPercentage([0, 0]);
    setVotes([0, 0]);
    let { randomNumber, result } = await generateRandomQuestionId(voted);
    if (result != questions) {
      setQuestions(result);
    }
    setQuestion(
      language === "es"
        ? result[randomNumber].question__es
        : result[randomNumber].question__en
    );
    setSrc(result[randomNumber].img);
    setSelected(false);
    setCurrentAnswer(randomNumber);
  };

  const onAnswerSelected = async (index: number) => {
    if (!selected) {
      setSelected(!selected);
      setSelectedAnswerIndex(index);
      if (!voted.includes(questions[currentAnswer].id)) {
        const newVoted = [...voted, questions[currentAnswer].id];
        setVoted(newVoted);
        localStorage.setItem("voted", JSON.stringify(newVoted));
      }
      await postVote(questions[currentAnswer].id, index, votes, currentVotes);
      if (currentVotes === 0) {
        let totalVotes = [0, 0];
        totalVotes[index] = 1;
        setPercentage(totalVotes);
        setVotes(
          totalVotes.map(
            (result: number) =>
              Math.round((result / (currentVotes + 1)) * 10000) / 100
          )
        );
      } else {
        let totalVotes = votes;
        totalVotes[index] = totalVotes[index] + 1;
        setPercentage(totalVotes);
        setVotes(
          totalVotes.map(
            (result: number) =>
              Math.round((result / (currentVotes + 1)) * 10000) / 100
          )
        );
      }
      scrollToBottom();
    }
  };

  return (
    <div
      className="quiz"
      style={{ marginTop: !selected ? "" : "-1%", paddingBottom: "1%" }}
    >
      {" "}
      <div className="vs">
        <h1 className={`${myFont.className} `}>MAN VS</h1>
      </div>
      <h2
        className={`question font-poppins ${!selected ? "question-size" : ""}`}
        style={{
          paddingBottom: !selected ? "12px" : "8px",
          paddingTop: !selected ? "12px" : "8px",
          paddingLeft: !selected ? "16px" : "12px",
          paddingRight: !selected ? "16px" : "12px",
        }}
      >
        <span className="question-mark">¿</span>
        {question}
        <span className="question-mark">?</span>
      </h2>
      <div className="quiz-container">
        <div className="quiz-box">
          <ImagesBox src={src} />
          <ChoicesBox
            loading={loading}
            selected={selected}
            onAnswerSelected={onAnswerSelected}
            language={language}
          />
          <ResultsBox
            votes={votes}
            selected={selected}
            percentage={percentage}
            currentVotes={currentVotes}
          />
        </div>
      </div>
      <BtnAgain
        loading={loading}
        selected={selected}
        nextQuestion={nextQuestion}
        language={language}
      />
      <div style={{ bottom: 0 }}></div>
    </div>
  );
};

export default Quiz;
