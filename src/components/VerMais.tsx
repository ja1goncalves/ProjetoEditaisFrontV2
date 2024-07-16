import React, { useEffect, useState } from "react";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png'
import FINEP from '../../public/images/FINEP.png'
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { FaSave, FaTrash  } from "react-icons/fa";
import { removerEdital, updateEditais } from "@/lib/api";

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
  criadoPorBot: boolean,
  link: string
}

interface CardsProps {
  id: number
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
  editar: boolean;
  filteredCards: Card[];
  setFilteredCards: Function;
}

export function VerMais(props:CardsProps) {
  
  const [showModal, setShowModal] = useState(false);

  const [nomeEdital, setNomeEdital] = useState(props.nome);
  const [categoria, setCategoria] = useState(props.categoria);
  const [publicoAlvo, setPublicoAlvo] = useState(props.publicoAlvo);
  const [area, setArea] = useState(props.area);
 
  const [dataPublicacao, setDataPublicacao] = useState(props.dataPublicacao.split(' ')[0]);
  const [horaPublicacao, setHoraPublicacao] = useState(props.dataPublicacao.split(' ')[1]);
  
  const [dataInicial, setDataInicial] = useState(props.dataInicial.split(' ')[0]);
  const [horaInicial, setHoraInicial] = useState(props.dataInicial.split(' ')[1]);
  
  const [dataFinal, setDataFinal] = useState(props.dataFinal.split(' ')[0]);
  const [horaFinal, setHoraFinal] = useState(props.dataFinal.split(' ')[1]);
  
  const [dataResultado, setDataResultado] = useState(props.resultado.split(' ')[0]);
  const [horaResultado, setHoraResultado] = useState(props.resultado.split(' ')[1]);

  function formatDate(date:any) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  function reFormatDate(date:any) {
    const [day, month, year] = date.split('-');
    return `${year}/${month}/${day}`;
  }
  
  function resetModal(){
    setShowModal(true)
    setNomeEdital(props.nome);
    setCategoria(props.categoria);
    setPublicoAlvo(props.publicoAlvo);
    setArea(props.area);
    setDataPublicacao(formatDate(props.dataPublicacao.split(' ')[0]));
    setHoraPublicacao(props.dataPublicacao.split(' ')[1]);

    setDataInicial(formatDate(props.dataInicial.split(' ')[0]));
    setHoraInicial(props.dataInicial.split(' ')[1]);

    setDataFinal(formatDate(props.dataFinal.split(' ')[0]));
    setHoraFinal(props.dataFinal.split(' ')[1]);

    setDataResultado(formatDate(props.resultado.split(' ')[0]));
    setHoraResultado(props.resultado.split(' ')[1]);
  }

 function handleEditalChanges(){
  const publicacao = `${reFormatDate(dataPublicacao)} ${horaPublicacao}`;
  const inicio = `${reFormatDate(dataInicial)} ${horaInicial}`;
  const final = `${reFormatDate(dataFinal)} ${horaFinal}`;
  const resultado = `${reFormatDate(dataResultado)} ${horaResultado}`;

  updateEditais(props.id, nomeEdital, categoria, publicoAlvo, area, publicacao, inicio, final, resultado, props.idUsuario, props.idOrgaoFomento, props.criadoPorBot)
    const updatedMachines = props.filteredCards.map(cards => {
      if (cards.id === props.id) {
        return {
          ...cards,
          id: props.id,
          nome: nomeEdital,
          categoria: categoria,
          publicoAlvo: publicoAlvo,
          area: area,
          dataPublicacao: publicacao,
          dataInicial: inicio,
          dataFinal: final,
          resultado: resultado,
          idOrgaoFomento: props.idOrgaoFomento,
          criadoPorBot: props.criadoPorBot,
          link: props.link,
        };
      }
    
      return cards;
    })

    props.setFilteredCards(updatedMachines);
    setShowModal(false)
  }

  function removeEdital(){
    removerEdital(props.id)
    setShowModal(false)
  }

  return (
    <>
      {!props.editar &&(
      <button onClick={() => resetModal()} className="flex justify-center gap-x-3 leading-none border-none outline-none rounded-xl bg-[#088395] px-8 py-2 text-lg text-white items-center cursor-pointer hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus">
        Ver mais
      </button>
      )}

      {props.editar &&(
        <button onClick={() => resetModal()} className="flex justify-center leading-none border-none outline-none rounded-xl bg-[#088395] py-2 px-2 text-lg text-white items-center cursor-pointer hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus">
          <AiFillEdit />
        </button>
      )}
          
      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl ${props.editar?('w-[80vw] h-[85vh]'):('w-[65vw] h-[75vh]')}`}>
              <div className={`flex bg-white flex-col px-10  gap-8 rounded-xl w-full h-full overflow-y-scroll`}>
                <div className={`flex flex-col w-full justify-center px-6 pt-5 rounded-lg ${props.editar?('gap-y-9'):('gap-y-5')}`}>
                
                  <div className="flex justify-center items-center">
                    {props.idOrgaoFomento === 1 ? (
                      <Image
                        src={Marca_FACEPE}
                        alt="Descrição da imagem do FACEPE"
                        width={300}
                        height={200}
                      />
                    ) : (
                      <Image
                        src={FINEP}
                        alt="Descrição da imagem da FINEP"
                        width={300}
                        height={200}
                      />
                    )}
                  </div>

                  <div className="flex text-center flex-row justify-between w-full">
                    {!props.editar&&(<p className="font-bold text-lg">{props.nome}</p>)}
                    {props.editar&&( 
                      <input
                        type="name"
                        value={nomeEdital}
                        onChange={(e) => setNomeEdital(e.target.value)}
                        className="border-b border-b-[#1C1C1C] w-full block text-lg text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                        placeholder="Insira o nome do edital"
                        required
                      />
                      )}
                  </div>

                  <div className="gap-x-10 gap-y-[2vh] flex flex-col">
                    <div className="flex items-center gap-x-5">
                      <p className="font-semibold">Publicação:</p>
                      {!props.editar&&(<p className="ml-1">{props.dataPublicacao}</p>)}
                      {props.editar&&( 
                        <div className="flex flex-row">
                          <input
                            type="date"
                            value={dataPublicacao}
                            onChange={(e) => setDataPublicacao(e.target.value)}
                            className="w-[80%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tl-full rounded-bl-full focus:border-[#088395]"
                            required
                          />
                          <input
                            type="time"
                            value={horaPublicacao}
                            onChange={(e) => setHoraPublicacao(e.target.value)}
                            className="w-[50%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tr-full rounded-br-full focus:border-[#088395]"
                            required
                          />
                        </div>
                        )}
                    </div>
                    <div className="flex">
                      <p className="font-semibold">Órgão de Fomento:</p>
                      <p className="ml-1">{props.idOrgaoFomento === 1?('FACEPE'):('FINEP')}</p>

                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="font-semibold">Área: </p>
                      {!props.editar&&(<p className="ml-1">{props.area === ''?(<span className="italic text-sm underline">Adicionar área</span>):props.area}</p>)}
                      {props.editar&&( 
                        <input
                          type="name"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="border-b border-b-[#1C1C1C] w-[30%] text-left block text-lg text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                          placeholder="Insira a área de atuação do edital"
                          required
                        />
                        )}
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="font-semibold">Categoria:</p>
                      {!props.editar&&(<p className="ml-1">{props.categoria === ''?(<span className="italic text-sm underline">Adicionar categoria</span>):props.categoria}</p>)}
                      {props.editar&&( 
                        <input
                          type="name"
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="border-b border-b-[#1C1C1C] w-[30%] text-left block text-lg text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                          placeholder="Insira a categoria do edital"
                          required
                        />
                        )}
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <p className="font-semibold">Publico Alvo:</p>
                      {!props.editar&&(<p className="ml-1">{props.publicoAlvo === ''?(<span className="italic text-sm underline">Adicionar publico alvo</span>):props.publicoAlvo}</p>)}
                      {props.editar&&( 
                        <input
                          type="name"
                          value={publicoAlvo}
                          onChange={(e) => setPublicoAlvo(e.target.value)}
                          className="border-b border-b-[#1C1C1C] w-[30%] text-left block text-lg text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                          placeholder="Insira o público alvo do edital"
                          required
                        />
                        )}
                    </div>

                    <div className="flex flex-row w-full justify-start gap-x-[2vw]">
                      <div className="border rounded-lg flex flex-col px-5 py-2 items-center justify-center gap-y-3">
                        <p className="font-semibold">Data Inicial:</p>
                        {!props.editar&&(props.dataInicial === ''?('dd/mm/aaaa 00:00'):props.dataInicial)}
                        {props.editar&&( 
                          <div className="flex flex-row">
                            <input
                              type="date"
                              value={dataInicial}
                              onChange={(e) => setDataInicial(e.target.value)}
                              className="w-[55%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tl-full rounded-bl-full focus:border-[#088395]"
                              required
                            />
                            <input
                              type="time"
                              value={horaInicial}
                              onChange={(e) => setHoraInicial(e.target.value)}
                              className="w-[45%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tr-full rounded-br-full focus:border-[#088395]"
                              required
                            />
                          </div>
                        )}  
                      </div>

                      <div className="border rounded-lg flex flex-col px-5 py-2 items-center justify-center gap-y-3">
                        <p className="font-semibold">Data Final:</p>
                        {!props.editar&&(props.dataFinal === ''?('dd/mm/aaaa 00:00'):props.dataFinal)}
                        {props.editar&&( 
                          <div className="flex flex-row">
                            <input
                              type="date"
                              value={dataFinal}
                              onChange={(e) => setDataFinal(e.target.value)}
                              className="w-[50%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tl-full rounded-bl-full focus:border-[#088395]"
                              required
                            />
                            <input
                              type="time"
                              value={horaFinal}
                              onChange={(e) => setHoraFinal(e.target.value)}
                              className="w-[45%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tr-full rounded-br-full focus:border-[#088395]"
                              required
                            />
                          </div>
                        )} 
                      </div>

                      <div className="border rounded-lg flex flex-col px-5 py-2 items-center justify-center gap-y-3">
                        <p className="font-semibold">Resultado:</p>
                        {!props.editar&&(props.resultado === ''?('dd/mm/aaaa 00:00'):props.resultado)}
                        {props.editar&&( 
                          <div className="flex flex-row">
                            <input
                              type="date"
                              value={dataResultado}
                              onChange={(e) => setDataResultado(e.target.value)}
                              className="w-[60%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tl-full rounded-bl-full focus:border-[#088395]"
                              required
                            />
                            <input
                              type="time"
                              value={horaResultado}
                              onChange={(e) => setHoraResultado(e.target.value)}
                              className="w-[40%] block text-base text-[#1C1C1C] bg-transparent appearance-none outline-none ring-0 rounded-tr-full rounded-br-full focus:border-[#088395]"
                              required
                            />
                          </div>
                        )} 
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-row items-center justify-between font-semibold">
                    <button onClick={()=>{setShowModal(false)}} className="mr-2 flex items-center px-3 py-2 rounded-md text-black text-semibold cursor-pointer border border-[#088395] hover:opacity-60">
                      Voltar
                    </button>

                    {!props.editar&&(
                      <a href={props.link} className="mr-2 flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#088395] hover:opacity-60">
                        <FaFileDownload  className="mr-2"/> Baixar Edital
                      </a>
                    )}

                    {props.editar&&(
                      <div className="flex flex-row gap-x-5">
                        <button onClick={removeEdital} className="mr-2 flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-red-500 hover:opacity-60">
                          <FaTrash  className="mr-2"/> Remover Edital
                        </button>

                        <button onClick={handleEditalChanges} className="mr-2 flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#088395] hover:opacity-60">
                          <FaSave className="mr-2"/> Salvar Alterações
                        </button>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}