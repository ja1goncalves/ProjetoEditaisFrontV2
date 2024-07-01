"use client";
import React, { useState } from "react";
import { createUser } from "../lib/api";
import { Cards } from "./Cards";
import { Header } from "./Header";
import Image from "next/image";

import recAnt1 from "../../public/images/RecifeAntigo.png";
import lupa from "../../public/images/lupa.png";
import "../../public/curva.css";

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
        <Header />
        <div className="w-full">
          <section className="relative flex flex-col items-center min-h-[400px]">
            <Image
              src={recAnt1}
              alt="ImagemTuristica"
              objectFit="contain"
              className="h-[80vh] absolute opacity-60"
            />
            <div className="w-full h-[80vh] bg-[#088395]" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-white text-5xl font-medium mb-16 px-96 text-center">
                Encontre os editais ideais para você em um só lugar
              </h1>
              <p className="text-white font-normal text-3xl mb-16 px-96 text-center">
                Acesse as principais oportunidades de apoio à pesquisa
                oferecidas por instituições de referência
              </p>
              <div className="w-full h-full max-w-xl max-h-14">
                <div className="flex items-center overflow-hidden p-1 bg-white rounded-3xl">
                  <Image src={lupa} alt={"Lupa"} className="w-14 pl-4" />
                  <input
                    type="text"
                    placeholder="Buscar editais..."
                    className="w-full px-4 py-2 text-gray-400 bg-white border-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="container flex">
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
      </div>
    </>
  );
}
