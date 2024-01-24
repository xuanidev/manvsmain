import React from "react";
import "./modal.css";
import Image from "next/image";
import { ModalProps } from "@/app/interfaces";
import xIcon from "../../public/icons/xIcon.svg";

const Modal: React.FC<ModalProps> = ({ show, setShowModal }) => {
  return (
    <div className={`modal ${show ? "modalActive" : "modalInactive"}`}>
      <div
        className={`modalContainer ${
          show ? "modalContainerActive" : "modalContainerInactive"
        }`}
      >
        {" "}
        <div className="xIcon">
          <Image
            src={xIcon}
            width={20}
            height={20}
            style={{
              boxSizing: "border-box",
            }}
            alt="language-icon"
            className=""
            onClick={() => setShowModal(!show)}
          />
        </div>
        <h2
          className={`modal__tittle ${
            show ? "modal__tittleActive" : "modal__tittleInactive"
          }`}
        >
          ¿Qué es MANVS?
        </h2>
        <p
          className={`modal__text ${
            show ? "modal__textActive" : "modal__textInactive"
          }`}
        >
          <span style={{ fontWeight: "600" }}>MANVS</span> desafía tu
          imaginación con preguntas sobre situaciones hipotéticas. Elige las
          respuestas a las preguntas planteadas y contribuye a las estadísticas
          sobre percepciones en contextos sorprendentes.
        </p>
        <p
          className={`modal__text ${
            show ? "modal__textActive" : "modal__textInactive"
          }`}
        >
          Inspirada por la famosa encuesta de{" "}
          <a
            href="https://today.yougov.com/society/articles/35852-lions-and-tigers-and-bears-what-animal-would-win-f?redirect_from=%2Ftopics%2Flifestyle%2Farticles-reports%2F2021%2F05%2F13%2Flions-and-tigers-and-bears-what-animal-would-win-f"
            target="_blank"
            style={{ color: "#f4b66f", fontWeight: "600" }}
          >
            YouGov
          </a>{" "}
          sobre la capacidad de las personas para vencer a unos animales. La
          intención de <span style={{ fontWeight: "600" }}>MANVS</span> es
          mantener una base de datos con las respuestas para comparar tus
          respuestas con las del resto de participantes.
        </p>
      </div>
    </div>
  );
};

export default Modal;
