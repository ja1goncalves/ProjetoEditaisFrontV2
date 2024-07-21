"use client"
import React, { useContext, useEffect, useState } from "react";
import { FaFileDownload, FaFileUpload, FaRegStar, FaRegTrashAlt, FaSearch, FaStar } from "react-icons/fa";
import { criarPreProjeto, getEditais, getEditaisFavoritos, getEditaisId, getPreProjetos, getUserLogin, removeEditalFavorito, removerPreProjeto, uploadFile, urlBase } from "@/lib/api";
import { useRouter } from "next/navigation";
import { HeaderIn } from "./Header";
import { COLORS } from '../../src/lib/AppStyles';
import Image from "next/image";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png'
import FINEP from '../../public/images/FINEP.png'
import { AuthContext } from "@/app/contexts/AuthContext";

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
  criadoPorBot: boolean,
  link: string
  preProjLink: string
  preProjId: number
}

interface Card {
  id: number
  nome: string;
  dataPublicacao: string;
  idOrgaoFomento: number;
}

interface PreProj {
  id: number
  idUsuario: number
  idEdital: number
  link: string
}

export function DashFavoritos() {

  const userInfo = useContext(AuthContext).user
  const [newSearch, setNewSearch] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isEditaisVisible, setIsEditaisVisible] = useState(false);

  const [editais, setEditais] = useState<Edital[]>([]);
  const [selectedEdital, setSelectedEdital] = useState<Edital | null>(null);

  

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);

  const [file, setFile] = useState<File | undefined>()
  const [preProjetos, setPreProjetos] = useState<PreProj[]>([]);


  async function handlePreProjeto (e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    if (target.files && target.files[0]) {
      const formData = new FormData();
      formData.append('preprojeto_pdf', target.files[0]);
      if (selectedEdital) {
        try {
          const preProjetoResponse = await criarPreProjeto(userInfo.id, selectedEdital.id);
          const uploadResponse = await uploadFile('preprojeto', preProjetoResponse.id, formData);
          console.log('File uploaded successfully:', uploadResponse);
          setNewSearch(!newSearch)
          setIsEditaisVisible(false)
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }
  };

  useEffect(() => {
    getEditais().then((result) => {
        setEditais(result);
      });
    
  }, []);

  useEffect(() => {
    if(userInfo.idPerfil!=0){
      getEditaisFavoritos(userInfo.id).then((result2) => {
        console.log(result2)
        const newEditais = result2.map((edital: Edital) => ({
          id: edital.id,
          nome: edital.nome,
          categoria: edital.categoria,
          publicoAlvo: edital.publicoAlvo,
          area: edital.id,
          dataPublicacao: edital.dataPublicacao,
          dataInicial: edital.dataInicial,
          dataFinal: edital.dataFinal,
          resultado: edital.resultado,
          idOrgaoFomento: edital.idOrgaoFomento,
          criadoPorBot: edital.criadoPorBot,
          link: `${urlBase}edital/${edital.id}/pdf`,
          preProjLink: '#'
        }));

        const newCards = result2.map((card: Card) => ({
          id: card.id,
          nome: card.nome,
          dataPublicacao: card.dataPublicacao,
          idOrgaoFomento: card.idOrgaoFomento
        }));
        setEditais(newEditais);
        setFilteredCards(newCards);
        setCardData(newCards);
      })
      getPreProjetos(userInfo.id).then((result2) => {
        console.log(result2)
        const newPreProjetos = result2.map((preProjeto: PreProj) => ({
          id: preProjeto.id,
          idUsuario: preProjeto.idUsuario,
          idEdital: preProjeto.idEdital,
          link: `${urlBase}preprojeto/${preProjeto.id}/pdf`
        }));

        setPreProjetos(newPreProjetos);

      })
    }

  }, [userInfo, newSearch]);

  const searchCards = (searchTerm: string) => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    const filtered = cardData.filter((card) =>
      card.nome.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredCards(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchCards(searchTerm);
    }
  };

  const onClickSearch = () => {
    searchCards(searchTerm);
  };

  function showEditais(card: Card) {
    const selectedEdital = editais.find(edital => edital.id === card.id);
    
    if (selectedEdital) {
      const preProjeto = preProjetos.find(p => p.idEdital === selectedEdital.id);
      if (preProjeto) {
        selectedEdital.preProjLink = preProjeto.link;
        selectedEdital.preProjId = preProjeto.id
      } 
      else {
        selectedEdital.preProjLink = '#';
      }
      setSelectedEdital(selectedEdital);
      setIsEditaisVisible(true);
    } 
    
    else {
      setSelectedEdital(null);
      setIsEditaisVisible(false);
    }
  } 

  const handleRemoveFavorite = async (card: Card) => {
    const confirmRemoval = confirm(`Deseja apagar o edital: "${card.nome}"? Apaga-lo irá remover o pré-projeto inserido`);
    if (confirmRemoval) {
      try {
        await removeEditalFavorito(userInfo.id, card.id);
        setCardData((prevCards) => prevCards.filter((edital) => edital.id !== card.id));
        setFilteredCards((prevCards) => prevCards.filter((edital) => edital.id !== card.id));
        setIsSelected(false);
        setIsEditaisVisible(false);
        alert("Edital removido!");
      } catch (error) {
        console.error("Failed to remove edital from favorites:", error);
        alert("Falha ao remover o edital dos favoritos.");
      }
    }
  };

  return (
    <div className="relative ">
      <div className={` bg-[#C5E2E6]`}>
      <section className="relative flex flex-col items-center min-h-[400px]">
        <div className="w-full h-[65vh] bg-gradient-to-r from-[#37B7C3] to-[#088395]" />
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
      
      <div className="absolute top-28 w-full justify-between flex">
        <div className="bg-[#C5E2E6] w-[28vw] ml-16 h-[80vh] rounded-xl shadow-2xl flex flex-col items-center">

            <div className="items-center flex justify-center my-5">
              <FaRegStar className="mr-2 items-center flex text-[#088395]" size={20} />
              <h2 className="font-bold text-xl text-[#088395] font-sans">Favoritos</h2>
              <div className="border-t-2 border-gray-50"></div>
            </div> 

            <div className=" w-full h-full">
              
              <div className="flex flex-col items-center justify-start w-full mt-6 mb-2">
                
                <div className="flex items-center bg-white w-80 rounded-2xl pl-2 pr-2 py-2 mb-6">
                  <input
                    type="text"
                    placeholder="Buscar editais..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-gray-400 text-lg pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-1 px-2"
                  />
                  <button
                    onClick={onClickSearch}
                    className="flex items-center justify-center bg-[#37B7C3] rounded-2xl px-6 py-3"
                  >
                    <FaSearch className="text-white" />
                  </button>
                </div>
                
                <div className="flex flex-col w-full px-5 overflow-y-scroll h-[55vh] border-t pt-5" style={{ scrollbarWidth: 'thin' }} >
                  {filteredCards.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl p-3 mb-4 shadow-md w-[100%] flex flex-col justify-between ${(card.id!=selectedEdital?.id)&&('cursor-pointer hover:opacity-60')} ${(isSelected)?(card.id==selectedEdital?.id?('border bgb'):('opacity-30')):('')}`}
                      onClick={() => {showEditais(card); setIsSelected(true)}}
                    >
                      <div className="flex ml-auto mb-2 gap-x-2">
                        {(card.id==selectedEdital?.id)?
                        (<>
                          <a href={selectedEdital.link} className="text-[#37B7C3] hover:opacity-60">
                            <FaFileDownload/>
                          </a>
                          <button className="relative group text-[#37B7C3]">
                              <FaStar className="group-hover:hidden" />
                              <FaRegStar className="hidden group-hover:block" onClick={() => handleRemoveFavorite(card)} />
                          </button>
                        </>)
                        :
                        (<>
                          <div className="text-gray-200">
                            <FaFileDownload/>
                          </div>
                          <div className="text-gray-200">
                            <FaStar />
                          </div>
                        </>)
                        }
                      </div>
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-bold">{card.nome}</h2>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm text-gray-600">Publicação: {card.dataPublicacao}</p>
                      </div>
                    </div>
                  ))}

                </div>

              </div>
            </div>
      
        </div>

        {isEditaisVisible && selectedEdital && (
          <div className="bg-[#F5F5F5] w-[60vw] mr-16 h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-y-scroll" style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }}>
            <div className="flex items-center justify-center mt-8">
              {selectedEdital.idOrgaoFomento === 1 ? (
                <Image src={Marca_FACEPE} alt="Marca FACEPE" width={250} height={250} />
              ) : (
                <Image src={FINEP} alt="FINEP" width={50} height={50} />
              )}
            </div>
            <div className="flex text-center flex-row items-center justify-center w-full mt-6">
                <p className="font-bold text-lg text-center">{selectedEdital.nome}</p>
              </div>
              <div className="ml-12 mt-12 flex flex-col justify-between h-full pb-[10vh]">

                <div>
                  <div className="flex items-center gap-x-2">
                    <p className="font-semibold">Publicação:</p>
                    <p>{selectedEdital.dataPublicacao}</p>
                  </div>
                  <div className="flex">
                    <p className="mb-1 font-semibold">Órgão de Fomento:</p>
                    <p className="ml-1">{selectedEdital.idOrgaoFomento === 1?('FACEPE'):('FINEP')}</p>
                  </div>

                  <div className="flex items-center gap-x-2">
                      <p className="font-semibold">Área:</p>
                      <p>{selectedEdital.area}</p>
                  </div>

                  <div className="flex items-center gap-x-2">
                      <p className="font-semibold">Categoria:</p>
                      <p>{selectedEdital.categoria}</p>
                  </div>

                  <div className="flex items-center gap-x-2">
                      <p className="font-semibold">Público-alvo:</p>
                      <p>{selectedEdital.publicoAlvo}</p>
                  </div>
                </div>
                
                <div className="gap-x-10 gap-y-[2vh] flex flex-col">
                  <div className="flex flex-row w-full justify-center gap-x-[2vw]">
                    <div className="border rounded-lg flex flex-col px-5 py-2 items-center justify-center gap-y-3">
                      <p className="font-semibold">Data Inicial:</p>
                      {selectedEdital.dataInicial === ''?('dd/mm/aaaa 00:00'):selectedEdital.dataInicial}
                    </div>

                    <div className="border rounded-lg flex flex-col px-5 py-2 items-center justify-center gap-y-3">
                      <p className="font-semibold">Data Final:</p>
                      {selectedEdital.dataFinal === ''?('dd/mm/aaaa 00:00'):selectedEdital.dataFinal}
                    </div>

                    <div className="border rounded-lg flex flex-col px-5 py-2 items-center justify-center gap-y-3">
                      <p className="font-semibold">Resultado:</p>
                      {selectedEdital.resultado === ''?('dd/mm/aaaa 00:00'):selectedEdital.resultado}
                    </div>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2">

                  {selectedEdital.preProjLink!='#'?(<div className="flex flex-row justify-start">
                    <a href={selectedEdital.preProjLink} className="flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-green-1200 hover:opacity-60 select-none whitespace-nowrap">
                      <FaFileDownload  className="mr-2"/> Baixar Pre-Projeto
                    </a>
                  </div>):(<div/>)}

                  <div className="flex flex-row justify-end w-full items-center gap-x-4 px-12">
                    {selectedEdital.preProjLink!='#'?(
                    <div className="flex flex-row justify-end">
                      <button onClick={()=>{removerPreProjeto(selectedEdital.preProjId); setNewSearch(!newSearch); setIsEditaisVisible(false)}} className="flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#DC1D00]  hover:opacity-60 select-none whitespace-nowrap">
                        Remover pré-projeto<FaRegTrashAlt    className="ml-2"/> 
                      </button>
                    </div>
                    
                    ) : (
                    <div className="relative inline-block">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handlePreProjeto}
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#088395] hover:opacity-60 select-none whitespace-nowrap"
                      >
                        <span>Subir pré-projeto</span> <FaFileUpload className="ml-2" />
                      </label>
                    </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}
      </div>
    </div>
    </div>
  );
}
