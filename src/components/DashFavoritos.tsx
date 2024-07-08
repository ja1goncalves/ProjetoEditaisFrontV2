"use client"
import { HeaderIn } from "./Header";
import { useEffect, useState } from "react";
import React from 'react';
import { COLORS } from '../../src/lib/AppStyles'
import { getEditais } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FaFileUpload, FaRegEdit, FaRegStar, FaSearch, FaStar } from "react-icons/fa";

interface Edital {
  id: string;
  nome: string;
  orgaoDeFomento: string;
  area: string;
  dataIni: string;
  dataFim: string;
  dataResul: string;
}

interface Card {
  title: string;
  publication: string;
  edital: string;
}

export function DashFavoritos() {
  const cardData = [
    {
      title: "20/2024 - IPECTI: Cidades inteligentes e resilientes",
      publication: "6 de junho de 2024",
      edital: "facepe",
    },
    {
      title: "18/2024 - APQ – Universal (Auxílio a Projetos de Pesquisa)",
      publication: "27 de maio de 2024",
      edital: "facepe",
    },
    {
      title:
        "17/2024 - Apoio aos laboratórios multiusuários e aos acervos científicos de Pernambuco",
      publication: "30 de maio de 2024",
      edital: "facepe",
    },
  ];
  
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState("editais");
  const [isEditaisVisible, setIsEditaisVisible] = useState(false);
  const [editais, setEditais] = useState<Edital[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar o aviso de confirmação
  const [selectedEdital, setSelectedEdital] = useState<Edital | null>(null); // Estado para armazenar o edital selecionado para remoção
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>(cardData);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      //router.push('/login');
    } else {
      getEditais().then((result) => {
        setEditais(result);
      });
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

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

  
  const handleEditalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);
    }
  };
  function showEditais() {
    setCurrentPage("editais");
    setIsEditaisVisible(true);
  }

  function handleRemoveFavoriteClick(edital: Edital) {
    setSelectedEdital(edital);
    setShowConfirmation(true);
  }

  function confirmRemoveFavorite() {
    if (selectedEdital) {
      const updatedEditais = editais.filter((edital) => edital.id !== selectedEdital.id);
      setEditais(updatedEditais);
    }
    setShowConfirmation(false); 
  }

  function cancelRemoveFavorite() {
    setShowConfirmation(false); 
  }

  return (
  <div>
    <div className={`bg-[${COLORS.bgDark}] h-[100vh] py-24`}>
      <HeaderIn />
      <div className="mx-11 h-full flex flex-row justify-between gap-x-10">
        <div className="rounded-xl w-[30%] h-[80vh] flex flex-col items-center"
          style={{
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
            transition: 'opacity 0.3s ease-in-out',
          }}>
          {(currentPage === "editais") && (<h1 className="font-bold border-b border-b-gray-100 flex flex-row w-full justify-center py-3 text-xl"><FaRegStar className="mr-2 items-center flex" />Favoritos</h1>)}
          {(currentPage === "editais") &&
            (
              <>
                <div className="overflow-y-scroll"  style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }}>
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
                        onClick={onClick}
                        className="flex items-center justify-center bg-[#37B7C3] rounded-2xl px-6 py-3"
                      >
                        <FaSearch className="text-white" />
                      </button>
                    </div>
                    {cardData.map((card, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-3 m-3 mb-4 shadow-md flex flex-col justify-between"
                      >
                        <div className="flex ml-auto mb-2">
                        <label className="mr-2 text-[#37B7C3] cursor-pointer">
                            <input
                              type="file"
                              accept="application/pdf"
                              style={{ display: "none" }}
                              onChange={handleEditalUpload}
                            />
                            <FaFileUpload />
                          </label>
                          <button  className="text-[#37B7C3]" onClick={() => handleRemoveFavoriteClick(card)} ><FaStar /></button>
                        </div>
                        <button className="items-start"
                          onClick={showEditais}>
                        <div className="flex items-start justify-between mb-4">
                          <h2 className="text-xl font-bold">{card.title}</h2>
                        </div>
                        <div className="flex justify-between mb-2">
                          <p className="text-sm text-gray-600">Publicação: {card.publication}</p>
                        </div>
                    
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
        </div>

        {isEditaisVisible && (
          <div
            className={`flex flex-col px-10 pb-10 pt-5 gap-8 rounded-xl w-[70%] overflow-y-scroll`}
            style={{
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
              transition: 'opacity 0.3s ease-in-out',
            }}>
            {(currentPage === "editais") && <button className="w-full font-bold text-left">Editais</button>}
  
            {currentPage === "editais" && editais.map((edital) => (
              <div
                key={edital.id}
                className="border items-start border-gray-100 flex flex-col w-full justify-center px-6 pt-5 rounded-lg gap-y-5"
              >
                <div className="flex flex-row justify-between w-full">
                  <p className="font-bold text-lg">{edital.nome}</p>
                </div>
                <div className="flex flex-row justify-between gap-x-10">
                  <p>Inicio: {edital.dataIni}</p>
                  <p>Fim: {edital.dataFim}</p>
                  <p>Resultado: {edital.dataFim}</p>
                </div>
                <p>{edital.area}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-96">
            <p className="text-lg font-semibold mb-4">Tem certeza que deseja remover este edital dos favoritos?</p>
            <div className="flex justify-center">
              <button onClick={confirmRemoveFavorite} className="bg-[#228B22] hover:bg-[#1E5324] text-white px-4 py-2 rounded-md mr-2">Confirmar</button>
              <button onClick={cancelRemoveFavorite} className="bg-[#FF0000] hover:bg-[#800000] text-white px-4 py-2 rounded-md">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
