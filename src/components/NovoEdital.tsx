"use client";
import { AuthContext } from "@/app/contexts/AuthContext";
import { criarEdital } from "@/lib/api";
import React, { useContext, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

type User = {
  id: number;
  login: string;
  nome: string;
  idPerfil: number;
  senha: string;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  cardData: Card[];
  setCardData: (cards: Card[]) => void;
  filteredEditais: Card[];
  setFilteredEditais: (editais: Card[]) => void;
}

interface Card {
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

export function NovoEdital(props: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [editaisData, setEditaisData] = useState({
    nome: "",
    categoria: "",
    publicoAlvo: "",
    area: "",
    datapublicacao: "",
    datainicial: "",
    datafinal: "",
    resultado: "",
    idOrgaoFomento: 1,
    criadoPorBot: false,
    idUsuario: props.user.id,
    horaPublicacao: "",
    horaInicial: "",
    horaFinal: "",
  });

  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props.isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditaisData({
      ...editaisData,
      [name]: value,
    });
  };

  const formatDateTime = (date: string, time: string) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return `${day}/${month}/${year} ${hour}:${minute}:00`;
  };

  function resetModal() {
    setShowModal(true);
  }

  const cadastrarEdital = async () => {
    const dataPublicacao = formatDateTime(
      editaisData.datapublicacao,
      editaisData.horaPublicacao || "00:00:00"
    );
    const dataInicial = formatDateTime(
      editaisData.datainicial,
      editaisData.horaInicial || "00:00:00"
    );
    const dataFinal = formatDateTime(
      editaisData.datafinal,
      editaisData.horaFinal || "00:00:00"
    );

    const editalData = {
      ...editaisData,
      dataPublicacao,
      dataInicial,
      dataFinal,
    };

    try {
      const novoEdital = await criarEdital(editalData);

      const updatedCardData = [...props.cardData, novoEdital];
      const updatedFilteredEditais = [...props.filteredEditais, novoEdital];

      props.setCardData(updatedCardData);
      props.setFilteredEditais(updatedFilteredEditais);

      props.onClose();
      console.log("Edital cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao criar edital", error);
    }
  };

  if (!props.isOpen) return null;

  return props.isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-[60vw]">
        <div className="bg-[#F0F0F0] h-auto w-[50vw] rounded-lg shadow-lg overflow-y-auto">
          <div className="ml-8 mt-4">
            <button
              onClick={props.onClose}
              className="flex items-center gap-1 hover:underline hover:text-[#088395] text-lg"
            >
              <IoIosArrowRoundBack size={22} /> Voltar
            </button>
          </div>
          <div className="flex justify-center mb-10">
            <h2 className="font-semibold text-3xl text-[#088395]">
              Cadastrar Novo Edital
            </h2>
          </div>
          <div className="grid grid-cols-2 ml-8">
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="id"
              >
                Título
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[25vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="titulo"
                  type="text"
                  onChange={handleInputChange}
                  name="nome"
                />
              </div>
            </div>
            <div className="items-center ml-24">
              <label
                className="block text-[#3C3C3C] text-md  font-bold mb-2"
                htmlFor="id"
              >
                Categoria
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[15vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="categoria"
                  type="text"
                  onChange={handleInputChange}
                  name="categoria"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 ml-8 mt-6">
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md  font-bold mb-2"
                htmlFor="id"
              >
                Público Alvo
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[15vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="publicoalvo"
                  type="text"
                  onChange={handleInputChange}
                  name="publicoAlvo"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md  font-bold mb-2"
                htmlFor="id"
              >
                Área
              </label>
              <div className="relative">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[15vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="area"
                  type="text"
                  onChange={handleInputChange}
                  name="area"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md  font-bold mb-2"
                htmlFor="id"
              >
                ID Orgão de Fomento
              </label>
              <div className="relative">
                <input
                  className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[10vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="idOrgao"
                  type="text"
                  onChange={handleInputChange}
                  name="idOrgaoFomento"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 ml-8 mt-6">
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="id"
              >
                Data e Hora de Publicação
              </label>
              <div className="relative">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="datapublicacao"
                  type="date"
                  onChange={handleInputChange}
                  name="datapublicacao"
                />
              </div>
              <div className="relative mt-4">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="horapublicacao"
                  type="time"
                  onChange={handleInputChange}
                  name="horaPublicacao"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md  font-bold mb-2"
                htmlFor="id"
              >
                Data e Hora Inicial
              </label>
              <div className="relative">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="datainicial"
                  type="date"
                  onChange={handleInputChange}
                  name="datainicial"
                />
              </div>
              <div className="relative mt-4">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="horainicial"
                  type="time"
                  onChange={handleInputChange}
                  name="horaInicial"
                />
              </div>
            </div>
            <div className="items-center">
              <label
                className="block text-[#3C3C3C] text-md  font-bold mb-2"
                htmlFor="id"
              >
                Data Final
              </label>
              <div className="relative">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="datafinal"
                  type="date"
                  onChange={handleInputChange}
                  name="datafinal"
                />
              </div>
              <div className="relative mt-4">
                <input
                  className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="horafinal"
                  type="time"
                  onChange={handleInputChange}
                  name="horaFinal"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-6 mx-8">
            <label
              className="block text-[#3C3C3C] text-md  font-bold mb-2"
              htmlFor="id"
            >
              Resultado
            </label>
            <div className="relative">
              <input
                className="shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="resultado"
                type="date"
                onChange={handleInputChange}
                name="resultado"
              />
            </div>
          </div>
          <div className="flex justify-end mx-8 my-4">
            <button
              onClick={cadastrarEdital}
              className="bg-[#088395] px-4 py-3 items-center text-white rounded-md text-xl"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
