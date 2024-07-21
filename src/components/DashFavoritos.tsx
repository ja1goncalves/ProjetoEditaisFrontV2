"use client"
import { useContext, useEffect, useState } from "react";
import { FaFileUpload, FaRegStar, FaSearch, FaStar } from "react-icons/fa";
import { getEditais, getEditaisFavoritos, getEditaisId, getUserLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import { HeaderIn } from "./Header";
import { COLORS } from '../../src/lib/AppStyles';
import Image from "next/image";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png'
import FINEP from '../../public/images/FINEP.png'
import { AuthContext } from "@/app/contexts/AuthContext";
import { userInfo } from "os";

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
}

interface Card {
  nome: string;
  dataPublicacao: string;
  idOrgaoFomento: number;
}

export function DashFavoritos() {

  const router = useRouter();

  const userInfo = useContext(AuthContext).user

  const [currentPage, setCurrentPage] = useState("editais");
  const [isEditaisVisible, setIsEditaisVisible] = useState(false);
  const [editais, setEditais] = useState<Edital[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEdital, setSelectedEdital] = useState<Edital | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);

  useEffect(() => {
    getEditais().then((result) => {
        setEditais(result);
      });
    
  }, []);

  useEffect(() => {
   
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
          link: `http://localhost:8081/upe/edital/${edital.id}/pdf`
        }));

        const newCards = result2.map((card: Card) => ({
          nome: card.nome,
          dataPublicacao: card.dataPublicacao,
          idOrgaoFomento: card.idOrgaoFomento
        }));
        setEditais(newEditais);
        setFilteredCards(newCards);
        setCardData(newCards);
      })

  }, []);

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

  const handleEditalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);
    }
  };

  function showEditais(card: Card) {
    setSelectedCard(card);
    setIsEditaisVisible(true);
  }

  function handleRemoveFavoriteClick(card: Card) {
    setSelectedCard(card);
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
    <div className={`bg-[${COLORS.bgDark}] h-screen py-24`}>
      <div className="mx-11 h-full flex flex-row justify-between gap-x-10">
        <div className="rounded-xl w-[30%] h-[80vh] flex flex-col items-center"
          style={{
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
            transition: 'opacity 0.3s ease-in-out',
          }}>
          {(currentPage === "editais") && (
            <h1 className="font-bold text-[#088395] items-center bg-[#C5E2E6] border-b-gray-100 flex flex-row w-full justify-center py-3 text-xl">
              <FaRegStar className="mr-2 items-center flex" />
              Favoritos
            </h1>
          )}
          {(currentPage === "editais") && (
            <>
              <div className="overflow-y-scroll bg-[#C5E2E6] w-full h-full" style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }}>
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
                  {filteredCards.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl p-3 mb-4 shadow-md w-[90%] hover:opacity-60 flex flex-col justify-between cursor-pointer ${card==selectedCard&&'opacity-60'}`}
                      onClick={() => showEditais(card)}
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
                        <button className="text-[#37B7C3]" onClick={() => handleRemoveFavoriteClick(card)}>
                          <FaStar />
                        </button>
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
            </>
          )}
        </div>

        {isEditaisVisible && selectedCard && (
          <div
            className={`flex bg-white flex-col px-10 pb-10 pt-5 gap-8 rounded-xl w-[70%] h-[80vh] overflow-y-scroll`}
            style={{
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <div className=" flex flex-col w-full justify-center px-6 pt-5 rounded-lg gap-y-5">
            <div className="flex justify-center items-center">
              {selectedCard.idOrgaoFomento === 1 ? (
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
                <p className="font-bold text-lg">{selectedCard.nome}</p>
              </div>
              <div className=" gap-x-10">
                <div className="flex">
                  <p className="mb-1 font-semibold">Publicação:</p>
                  <p className="ml-1">{selectedCard.dataPublicacao}</p>
                </div>
                <div className="flex">
                  <p className="mb-1 font-semibold">Órgão de Fomento:</p>
                  <p className="ml-1">{selectedCard.idOrgaoFomento === 1?('FACEPE'):('FINEP')}</p>
                </div>
                <div className="flex">
                  <p className="mb-1 font-semibold">Área:</p>
                </div>
                <div className="flex">
                  <p className="mb-1 font-semibold">Modalidade:</p>
                </div>
                <div className="font-semibold mt-3 mb-1">
                  <p>Descrição:</p>
                </div>
                <div className="border rounded-sm h-[100px] overflow-y-scroll" style={{ maxHeight: '100px', scrollbarWidth: 'thin' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                  </div>
              </div>
              <div className="ml-auto mt-2">
                <label className="mr-2 flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#088395]">
                  <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleEditalUpload}
                  />
                  <FaFileUpload className="mr-2"/> Adicionar Pré-projeto
                  </label>
              </div>
            </div>
          </div>
        )}
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-96">
            <p className="text-lg font-semibold mb-2">Tem certeza que deseja remover este edital dos favoritos?</p>
            <p className="text-sm mb-4">Ao fazer isso, arquivos anexados serão removidos.</p>
            <div className="flex justify-center gap-3">
              <button onClick={confirmRemoveFavorite} className="bg-[#228B22] hover:bg-[#1E5324] text-white px-4 py-2 rounded-md mr-2">Confirmar</button>
              <button onClick={cancelRemoveFavorite} className="bg-[#FF0000] hover:bg-[#800000] text-white px-4 py-2 rounded-md">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
