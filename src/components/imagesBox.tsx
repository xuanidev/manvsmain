import React from "react";
import Image from "next/image";
import "./imagesBox.css";
import localFont from "next/font/local";
import granite from "../../public/wall-4-light.png";
import man from "../../public/manvs-yllw.png";
import { ImagesBoxProps } from "@/app/interfaces";
const myFont = localFont({
  src: "../../public/fonts/ZTRavigsfen-Regular.woff",
});

const ImagesBox: React.FC<ImagesBoxProps> = ({ src }) => {
  return (
    <div className="images-box">
      <div className="images-box-center">
        <div
          style={{ backgroundImage: `url(${granite.src})` }}
          className="bg-image__left"
        ></div>
        <Image src={man} alt="Picture of the author" className="imgLeft" />
      </div>
      <div className="separator">
        <p className={`${myFont.className}`}>VS</p>
      </div>
      <div className="images-box-center">
        <div
          style={{ backgroundImage: `url(${granite.src})` }}
          className="bg-granite bg-granite-reverse"
        ></div>
        <div
          style={{ backgroundImage: `url(${src})` }}
          className="bg-oponent"
        ></div>
      </div>
    </div>
  );
};

export default ImagesBox;
