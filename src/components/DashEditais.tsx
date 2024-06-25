"use client";
import React, { useState } from "react";
import { createUser } from "../lib/api";
import { Cards } from "./Cards";
import Sidebar from "./Sidebar";

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
        <div className="flex items-center border-b border-gray-300">
          <h1 className="text-3xl m-4 ">Dashboard</h1>
        </div>
        <div className="container flex">
          <div className="w-1/4 h-screen">
            <Sidebar userProfilePic="/images/user.jpeg" username="Jonh Due" />
          </div>
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
