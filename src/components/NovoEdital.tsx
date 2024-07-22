"use client";
import { criarEdital } from "@/lib/api";
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";

type User = {
  id: number;
  login: string;
  nome: string;
  idPerfil: number;
  senha: string;
};

interface Edital {
  id: number;
  nome: string;
  categoria: string;
  publicoAlvo: string;
  area: string;
  dataPublicacao: string;
  dataInicial: string;
  dataFinal: string;
  resultado: string;
  idOrgaoFomento: number;
  idUsuario: number;
  criadoPorBot: boolean;
  link: string;
}

export function NovoEdital() {
  const [user, setUser] = useState<User | null>(null);
  const [editaisData, setEditaisData] = useState({
    nome: "",
    categoria: "",
    publicoAlvo: "",
    area: "",
    dataPublicacao: "",
    dataInicial: "",
    dataFinal: "",
    resultado: "",
    idOrgaoFomento: 1,
    criadoPorBot: false,
    idUsuario: user?.id || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditaisData({
      ...editaisData,
      [name]: value,
    });
  };

  const cadastrarEdital = async () => {
    try {
      await criarEdital(editaisData);
      console.log("Edital cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao criar edital", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg max-w-[90vw] md:max-w-[60vw]">
        <div className="bg-[#F0F0F0] h-auto w-full rounded-lg shadow-lg overflow-y-auto">
          <div className="flex justify-center my-10">
            <h2 className="font-semibold text-2xl text-[#088395]">
              Cadastrar Novo Edital
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="titulo"
              >
                Título
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="titulo"
                  type="text"
                  name="titulo"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="categoria"
              >
                Categoria
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="categoria"
                  type="text"
                  name="categoria"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-6">
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="publicoAlvo"
              >
                Público Alvo
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="publicoAlvo"
                  type="text"
                  name="publicoAlvo"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="area"
              >
                Área
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="area"
                  type="text"
                  name="area"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="idOrgaoFomento"
              >
                ID Orgão de Fomento
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="idOrgaoFomento"
                  type="text"
                  name="idOrgaoFomento"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-6">
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="dataPublicacao"
              >
                Data de Publicação
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dataPublicacao"
                  type="date"
                  name="dataPublicacao"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="dataInicial"
              >
                Data Inicial
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dataInicial"
                  type="date"
                  name="dataInicial"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="dataFinal"
              >
                Data Final
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dataFinal"
                  type="date"
                  name="dataFinal"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 px-4 mt-6">
            <label
              className="block text-[#3C3C3C] text-md font-bold mb-2"
              htmlFor="resultado"
            >
              Resultado
            </label>
            <div className="relative">
              <select
                id="resultado"
                name="resultado"
                className="rounded-lg bg-white border-[#BEBEBE] w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="1">Em Andamento</option>
                <option value="2">Finalizado</option>
              </select>
            </div>
          </div>
          <div className="flex justify-start px-4 my-4">
            <button className="rounded-md px-4 py-2 bg-[#DC1D00] text-white flex gap-2 items-center">
              <FaFilePdf size={22} /> Adicionar PDF
            </button>
          </div>
          <div className="flex justify-end px-4 my-4">
            <button
              onClick={cadastrarEdital}
              className="bg-[#088395] px-4 py-3 text-white rounded-md text-md"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
