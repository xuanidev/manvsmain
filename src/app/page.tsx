"use client";
import { useState } from "react";
import Quiz from "@/components/quiz";
//import Modal from '@/components/modal';
import LanguageSelector from "@/components/language-icon";
import bg from "../../public/bg-v.png";
import left from "../../public/leftbg2.png";
import rigth from "../../public/rigthbg2.png";
import granite from "../../public/subtle-grunge.png";
import Modal from "@/components/modal";

const scrollToBottom = () => {
  setTimeout(() => {
    const element = document.getElementById("bottom");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, 600);
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [languange, setLanguange] = useState("es");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header></header>
      <main className="main">
        <div
          className="bg-man__left "
          style={{ backgroundImage: `url(${left.src})` }}
        ></div>
        <div
          className="bg-man__right"
          style={{ backgroundImage: `url(${rigth.src})` }}
        ></div>
        <div
          className="bg-man"
          style={{ backgroundImage: `url(${bg.src})` }}
        ></div>
        <div
          className="bg-main"
          style={{
            backgroundImage: `url(${granite.src})`,
            backgroundPosition: "center",
            backgroundSize: "auto",
            position: "fixed",
          }}
        ></div>
        <div className="subcontainer">
          <Quiz
            loading={loading}
            setLoading={setLoading}
            language={languange}
            scrollToBottom={scrollToBottom}
          />
          <div id="bottom" style={{ bottom: 0 }}></div>
        </div>
        <div
          className="loader"
          style={{ display: loading ? "block" : "none" }}
        ></div>
        <div className="information" onClick={() => setShowModal(!showModal)}>
          <span className="question-mark__main">?</span>
        </div>
        <Modal show={showModal} setShowModal={setShowModal} />
        <LanguageSelector language={languange} setLanguage={setLanguange} />
        <div id="bottom" style={{ bottom: 0 }}></div>
      </main>
    </>
  );
}
