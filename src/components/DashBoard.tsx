"use client";
import React, { useEffect, useState } from "react";
import { createUser } from "../lib/api";
import { CardsGrid, CardsRow } from "./Cards";
import { HeaderOut } from "./Header";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { MdTableRows } from "react-icons/md";
import { CiGrid41 } from "react-icons/ci";
import igreja from "../../public/images/igreja.jpg";
import portoGalinhas from "../../public/images/portoGalinhas.jpg";
import recAnt1 from "../../public/images/recAntigo1.jpg";
import recAntigo2 from "../../public/images/recAntigo2.png";
import { FaSearch, FaFilter } from "react-icons/fa";

import poli from "../../public/images/poli.png";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlass,
} from "react-icons/fa6";

interface Card {
  title: string;
  publication: string;
  edital: string;
}

export function DashBoard() {
  const cardData = [
    {
      title: "20/2024 - IPECTI: Cidades inteligentes e resilientes",
      publication: "6 de junho de 2024",
      edital: "facepe",
    },
    {
      title: "18/2024 - APQ – Universal (Auxílio a Projetos de Pesquisa)",
      publication: "27 de maio de 2024",
      edital: "facepe",
    },
    {
      title:
        "17/2024 - Apoio aos laboratórios multiusuários e aos acervos científicos de Pernambuco",
      publication: "30 de maio de 2024",
      edital: "facepe",
    },
    {
      title: "16/2024 - 16/2024 – IPECTI Energias Renováveis e Descarbonização",
      publication: "16 de maio de 2024",
      edital: "facepe",
    },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>(cardData);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [igreja, portoGalinhas, recAnt1, recAntigo2];

  const [vizualizacao, setVizualizacao] = useState("row");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await createUser(name, email, password);
    console.log(response);
    if (response) {
      alert("Cadastro Realizado com sucesso!");
    } else {
      alert("Conta já cadastrada");
    }
  };

  const searchCards = (searchTerm: string) => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    const filtered = cardData.filter((card) =>
      card.title.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredCards(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchCards(searchTerm);
    }
  };

  const onClick = () => {
    searchCards(searchTerm);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="relative ">
        <div className="min-h-screen bg-[#EBF4F6]">
          <HeaderOut />
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="w-full h-[70vh] bg-[#088395]" />
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
                  className="relative block h-[600px] fill-[#EBF4F6]"
                ></path>
              </svg>
            </div>
          </section>

          <div className="absolute top-28">
            <div className="flex flex-col justify-center">
              <p className="text-white text-5xl font-semibold px-96 pb-8 text-center">
                Pesquisar
              </p>
              <p className="text-white font-[400] text-2xl pb-10 px-96 text-center">
                Descubra editais relevantes para você
              </p>
            </div>
            {/* -------------- BARRA DE PESQUISA -------------- */}
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-8 mx-40">
                <div className="flex items-center bg-white w-full rounded-2xl pl-5 pr-2 py-2 mr-6">
                  <input
                    type="text"
                    placeholder="Buscar editais..."
                    className="text-gray-400 text-lg pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-[1em]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={onClick}
                    className="flex items-center justify-center bg-[#37B7C3] rounded-2xl px-16 py-7"
                  >
                    <FaSearch className="text-white" />
                  </button>
                </div>
                <button className="flex items-center justify-center bg-white rounded-2xl px-10 py-9">
                  <FaFilter className="text-[#37B7C3]" />
                </button>
              </div>

              {/* -------------- DASHBOARD -------------- */}
              <div className="flex flex-col mx-40 rounded-3xl bg-white">
                <div className="border-b flex flex-row w-full items-center justify-between px-24 py-4">
                  <p className="text-xl">
                    Total de {filteredCards.length} editais disponíveis
                  </p>
                  <div
                    className="bg-[#37B7C3] text-white flex items-center justify-around p-2 rounded-full"
                    style={{ width: "132px", height: "42px" }}
                  >
                    <button
                      onClick={() => setVizualizacao("grid")}
                      className="p-2"
                    >
                      <CiGrid41 size={24} />
                    </button>
                    <div className="border-l h-6 mx-2 border-white"></div>
                    <button
                      onClick={() => setVizualizacao("row")}
                      className="p-2"
                    >
                      <MdTableRows size={24} />
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    vizualizacao == "grid"
                      ? "grid grid-cols-2"
                      : "flex flex-col"
                  } m-10 gap-x-20 gap-y-16`}
                >
                  {filteredCards.map((card, index) =>
                    vizualizacao === "grid" ? (
                      <CardsGrid
                        key={index}
                        title={card.title}
                        publication={card.publication}
                        edital={card.edital}
                      />
                    ) : vizualizacao === "row" ? (
                      <CardsRow
                        key={index}
                        title={card.title}
                        publication={card.publication}
                        edital={card.edital}
                      />
                    ) : null
                  )}
                </div>
                <div className="flex items-center justify-center border rounded-full p-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="flex items-center text-[#37B7C3] disabled:opacity-50"
                  >
                    <FaChevronLeft />
                    <span className="ml-1">Anterior</span>
                  </button>
                  <div className="flex mx-4">
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`mx-1 px-2 py-1 rounded-full ${
                          currentPage === number
                            ? "bg-[#37B7C3] text-white"
                            : ""
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center text-[#37B7C3] disabled:opacity-50"
                  >
                    <span className="mr-1">Próximo</span>
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              <div className="mt-32 w-full h-[8vh] bg-[#088395]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
