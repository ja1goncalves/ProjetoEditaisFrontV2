"use client";
import React, { useEffect, useState } from "react";
import { createUser } from "../lib/api";
import { RiSearchEyeLine } from "react-icons/ri";
import { HeaderOut } from "./Header";
import Image from "next/image";
import Link from "next/link";

import portoGalinhas from "../../public/images/portoGalinhas.jpg";
import recAntigo1 from "../../public/images/recAntigo2.png";
import rec1 from "../../public/images/rec1.jpg";
import rec2 from "../../public/images/rec2.jpg";
import rec3 from "../../public/images/rec3.jpg";
import rec4 from "../../public/images/rec4.jpg";
import facepe from "../../public/images/facepe_img.jpg";
import finep from "../../public/images/finep_img.jpg";

import poli from "../../public/images/poli.png";
import { Footer } from "./Footer";

interface Card {
  title: string;
  publication: string;
  edital: string;
}

export function DashEditais() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [rec4, rec3, portoGalinhas, rec2, recAntigo1, rec1];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <HeaderOut fix={false} />
        <div className="w-full mb-44">
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="flex flex-row w-full justify-end absolute">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`justify-center flex h-[80vh] w-[100vw] overflow-hidden relative `}
                  style={
                    index === currentIndex
                      ? {
                          transition: "opacity 1s ease-in-out",
                          position: "absolute",
                          opacity: "1",
                        }
                      : {
                          transition: "opacity 1s ease-in-out",
                          position: "absolute",
                          opacity: "0",
                        }
                  }
                >
                  <Image
                    src={image}
                    alt=""
                    objectFit="fit"
                    className="w-[100vw] absolute opacity-40"
                  />
                </div>
              ))}
            </div>
            <div className="w-full h-[80vh] bg-[#088395]" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-y-7">
              <p className="text-white text-5xl font-medium px-96 text-center">
                Encontre os editais ideais para você em um só lugar
              </p>
              <p className="text-white font-[300] text-2xl px-96 text-center">
                Acesse as principais oportunidades de apoio à pesquisa
                oferecidas por instituições de referência
              </p>

              <button className=" flex justify-center leading-none border-none outline-none rounded-xl bg-[#088395] px-4 py-3 text-white font-semibold text-lg items-center cursor-pointer mb-6 hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus">
                <Link
                  href="/search"
                  className="flex flex-row w-full items-center gap-x-3"
                >
                  <p>Comece agora a explorar os editais </p>
                  <RiSearchEyeLine />
                </Link>
              </button>
            </div>

            <div className="absolute bottom-0 left-0 w-[100%] overflow-hidden">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ transform: "scaleY(-1)" }}
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="relative block h-[600px] fill-white"
                ></path>
              </svg>
            </div>
          </section>
        </div>

        <h2
          id="sobre"
          className=" mb-7 text-[#1d7982] font-bold text-4xl text-center py-5 rounded-lg"
        >
          Sobre as Instituições
        </h2>

        {/* Bloco sobre a FACEPE */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg mb-36">
          <div className="md:w-1/2 md:pl-28 pr-28">
            <h2 className="text-3xl mb-10 bg-[#3ecad7] text-[#1d7982] text-center py-5 rounded-lg">
              FACEPE
            </h2>
            <p className="text-gray-700 text-xl text-center w-full">
              A Fundação de Amparo à Ciência e Tecnologia de Pernambuco (FACEPE)
              é uma instituição que promove o desenvolvimento científico e
              tecnológico do estado. Apoia pesquisas em diversas áreas do
              conhecimento, incentivando a produção de conhecimento e a
              inovação. Suas iniciativas incluem programas de fomento à
              pesquisa, bolsas de estudo e cooperações internacionais.
            </p>
          </div>
          <div className="flex justify-center md:w-1/2 mb-6 md:mb-0">
            <Image
              src={facepe}
              alt="FACEPE"
              className="w-3/4 h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Bloco sobre o FINEP */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg">
          <div className="flex justify-center md:w-1/2 mb-6 md:mb-0">
            <Image
              src={finep}
              alt="FINEP"
              className="w-3/4 h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-28 pr-28">
            <h2 className="text-3xl mb-10 bg-[#3ecad7] text-[#1d7982] text-center py-5 rounded-lg">
              FINEP
            </h2>
            <p className="text-gray-700 text-xl text-center w-full">
              A Financiadora de Estudos e Projetos (FINEP) é uma empresa pública
              brasileira vinculada ao Ministério da Ciência, Tecnologia e
              Inovações (MCTI). A FINEP apoia a inovação e a pesquisa científica
              e tecnológica em empresas, universidades, institutos tecnológicos
              e outras entidades. Suas iniciativas incluem financiamento de
              projetos, concessão de bolsas e investimentos em infraestrutura de
              pesquisa.
            </p>
          </div>
        </div>

        <div className="w-full mt-44">
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="absolute top-0 left-0 w-[100%] overflow-hidden z-10">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{
                  width: "calc(100% + 1.3px)",
                  transform: "scaleX(-1) scaleY(-1)",
                }}
              >
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  className="relative block h-[67px] fill-white"
                ></path>
              </svg>
            </div>

            <div className="relative w-full h-[60vh]">
              <div className="w-full h-full bg-[#088395] absolute opacity-80" />
              <Image
                src={poli}
                alt="ImagemTuristica"
                objectFit="fit"
                className="w-full h-full"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[100%] overflow-hidden">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ transform: "scaleX(-1) scaleY(-1)" }}
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="relative block h-[600px] fill-white"
                ></path>
              </svg>
            </div>
          </section>

          <div className="text-black top-0 left-0 w-full h-full flex flex-row items-center justify-center gap-x-7">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
