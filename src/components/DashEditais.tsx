"use client";
import React, { useState } from "react";
import { createUser } from "../lib/api";
import { Cards } from "./Cards";
import { Header } from "./Header";
import Image from 'next/image'

import recAnt1 from '../../public/images/RecifeAntigo.png'
import '../../public/curva.css'; 

export function DashEditais() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <>
      <div className="min-h-screen">
        <Header/>
        <div className="w-full">
          <section className="relative flex flex-col items-center min-h-[400px]">
            {/*<Image src={img01} alt="Pessoa utilizando a máquina da Recicletool" layout="fill" objectFit="contain" className="hidden lg:flex"/>*/}
            <Image src={recAnt1} alt="ImagemTuristica" objectFit="contain" className="h-[80vh] absolute opacity-60"/>
            <div className="w-full h-[80vh] bg-[#088395]"/>
            <div className="curve"/>
          </section>
        </div>
        <div className="container flex">
          <div className="w-3/4 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cardData.map((card, index) => (
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
