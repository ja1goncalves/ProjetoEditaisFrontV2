"use client";
import React, { useEffect, useState } from "react";
import { createUser } from "../lib/api";
import { Cards } from "./Cards";
import { HeaderOut } from "./Header";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";

import igreja from "../../public/images/igreja.jpg";
import portoGalinhas from "../../public/images/portoGalinhas.jpg";
import recAnt1 from "../../public/images/recAntigo1.jpg";
import recAntigo2 from "../../public/images/recAntigo2.png";

import poli from "../../public/images/poli.png";

interface Card {
  title: string;
  description: string;
  image: string;
}

export function DashEditais() {
  const cardData = [
    {
      title: "Is my community healthy?",
      description:
        "Id reprehenderit cupidatat duis proident ipsum cupidatat ea tempor non exercitation nulla duis sunt. Cupidatat labore irure...",
      image: "/images/Marca-FACEPE.png",
    },
    {
      title: "Most impactful channels",
      description:
        "Id reprehenderit cupidatat duis proident ipsum cupidatat ea tempor non exercitation nulla duis sunt. Cupidatat labore irure...",
      image: "/images/Marca-FACEPE.png",
    },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>(cardData);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [igreja, portoGalinhas, recAnt1, recAntigo2]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
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



  return (
    <>
      <div className="min-h-screen">
        <HeaderOut/>
        <div className="w-full">
          <section className="relative flex flex-col items-center min-h-[400px]">
            <Image src={images[currentIndex]} alt="ImagemTuristica" objectFit="contain" className="h-[80vh] absolute opacity-40"/>
            <div className="w-full h-[80vh] bg-[#088395]" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-y-7">
              <p className="text-white text-5xl font-medium px-96 text-center">
                Encontre os editais ideais para você em um só lugar
              </p>
              <p className="text-white font-[300] text-2xl px-96 text-center">
                Acesse as principais oportunidades de apoio à pesquisa
                oferecidas por instituições de referência
              </p>
              <div className="w-full h-full max-w-xl max-h-14 mt-4">
                <div className="flex items-center overflow-hidden p-1 bg-white rounded-3xl">
                  <button>
                    <FaMagnifyingGlass className="w-auto pl-4 text-[#37B7C3]" />
                  </button>
                  
                  <input
                    type="text"
                    placeholder="Buscar editais..."
                    className="text-gray-400 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-[1em]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            
            
            </div>

            <div className="absolute bottom-0 left-0 w-[100%] overflow-hidden">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{transform: "scaleY(-1)"}}>
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="relative block h-[600px] fill-white">
                </path>
              </svg>  
            </div>
          </section>
        </div>

        <div className="w-full">
          <div className="w-3/4 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCards.map((card, index) => (
                <Cards
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="absolute top-0 left-0 w-[100%] overflow-hidden z-10">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "calc(100% + 1.3px)", transform: "scaleX(-1) scaleY(-1)"}}>
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  className="relative block h-[67px] fill-white">
                </path>
              </svg>  
            </div>

            <div className="relative w-full h-[60vh]">
                <div className="w-full h-full bg-[#088395] absolute opacity-80"/>
                <Image src={poli} alt="ImagemTuristica" objectFit="fit" className="w-full h-full" />
            </div>

            <div className="absolute bottom-0 left-0 w-[100%] overflow-hidden">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{transform: "scaleX(-1) scaleY(-1)"}}>
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="relative block h-[600px] fill-white">
                </path>
              </svg>           
            </div>
          </section>

          <div className="text-black top-0 left-0 w-full h-full flex flex-row items-center justify-center gap-x-7">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
