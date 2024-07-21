"use client"
import { criarEdital } from "@/lib/api";
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";

type User = {
    id: number,
    login: string,
    nome: string,
    idPerfil: number,
    senha: string
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
    criadoPorBot: boolean,
    link: string
  }
  
export function NovoEdital(){
    const [user, setUser] = useState<User | null>(null)
    const [editaisData, setEditaisData] = useState({
        nome: '',
        categoria: '',
        publicoAlvo: '',
        area: '',
        dataPublicacao: '',
        dataInicial: '',
        dataFinal: '',
        resultado: '',
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
  
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-transparent p-6 rounded-lg shadow-lg w-[60vw]">
                <div className='bg-[#F0F0F0] h-auto w-[60vw] rounded-lg shadow-lg overflow-y-auto'>
                    <div className=" flex justify-center my-10">
                        <h2 className="font-semibold text-2xl text-[#088395]">Cadastrar Novo Edital</h2>
                    </div>
                    <div className="grid grid-cols-2 ml-8">
                        <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md font-bold mb-2' htmlFor='id'>
                                Título
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[30vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='number'
                                    name="id"
                                />
                            </div> 
                        </div>
                        <div className='items-center ml-24'>
                            <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                                Categoria
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[15vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='number'
                                    name="id"
                                />
                            </div> 
                        </div>
                    </div>
                    <div className="grid grid-cols-3 ml-8 mt-6">
                    <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                                Público Alvo
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[15vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='number'
                                    name="id"
                                />
                            </div> 
                        </div>
                        <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                                Área
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[15vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='number'
                                    name="id"
                                />
                            </div> 
                        </div>
                        <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                                ID Orgão de Fomento
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow bg-white border-[#BEBEBE] appearance-none border rounded w-[10vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='number'
                                    name="id"
                                />
                            </div> 
                        </div>
                    </div>
                    <div className="grid grid-cols-3 ml-8 mt-6">
                        <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md font-bold mb-2' htmlFor='id'>
                                Data de Publicação
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='date'
                                    name="id"
                                />
                            </div> 
                        </div>
                        <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                                Data Inicial
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='date'
                                    name="id"
                                />
                            </div> 
                        </div>
                        <div className='items-center'>
                            <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                                Data Final
                            </label>
                            <div className='relative'>
                                <input
                                    className='shadow  bg-white border-[#BEBEBE] appearance-none border rounded w-[12vw] py-1 px-4 pl-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='id' type='date'
                                    name="id"
                                />
                            </div> 
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-6 mx-8">
                        <label className='block text-[#3C3C3C] text-md  font-bold mb-2' htmlFor='id'>
                            Data Final
                        </label>
                        <div className='relative'>
                            <select
                            name="Resultado"
                            className="rounded-lg  bg-white border-[#BEBEBE]"
                            //value={editaisData.idOrgaoFomento}
                            //onChange={handleInputChange}
                            >
                            <option value={1}>Em Andamento</option>
                            <option value={2}>Finalizado</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-start mx-8 my-4">
                        <button className="rounded-md px-2 py-2 bg-[#DC1D00] text-white flex gap-2 items-center"><FaFilePdf size={22}/>Adicionar PDF</button>
                    </div>
                    <div className="flex justify-end mx-8 my-4">
                        <button onClick={cadastrarEdital} className="bg-[#088395] px-4 py-3 items-center text-white rounded-md text-md">Enviar</button>
                    </div>
                </div>
            </div>
        </div>

    );
}