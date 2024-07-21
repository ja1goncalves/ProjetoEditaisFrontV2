"use client";
import { useContext, useEffect, useState } from "react";
import { FaFileUpload, FaRegStar, FaSearch, FaStar } from "react-icons/fa";
import { getEditais, getUserLogin, getEditaisId, getEditaisFavoritos, removeEditalFavorito } from "@/lib/api";
import { useRouter } from "next/navigation";
import { HeaderIn, HeaderOut } from "./Header";
import { COLORS } from '../../src/lib/AppStyles';
import Image from "next/image";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png';
import FINEP from '../../public/images/FINEP.png';
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
  idUsuario: number,
  criadoPorBot: boolean,
  link: string
}

interface Card {
  nome: string;
  dataPublicacao: string;
  idOrgaoFomento: number;
}


export function Teste() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState("editais");
  const [isEditaisVisible, setIsEditaisVisible] = useState(false);
  const [editais, setEditais] = useState<Edital[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEdital, setSelectedEdital] = useState<Edital | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);
  const [favoritos, setFavoritos] = useState<Edital[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    searchCards(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchEditais() {
      try {
        const user = await getUserLogin('Bot');
        const editaisData = await getEditaisId(user.id);
        const newEditais = editaisData.map((edital: Edital) => ({
          ...edital,
          link: `http://localhost:8081/upe/edital/${edital.id}/pdf`
        }));

        const newCards = editaisData.map((card: Card) => ({
          title: card.nome,
          publication: card.dataPublicacao,
          orgao: card.idOrgaoFomento
        }));

        setEditais(newEditais);
        setFilteredCards(newCards);
        setCardData(newCards);
      } catch (error) {
        console.error("Erro ao buscar editais:", error);
      }
    }

    fetchEditais();
  }, []);

  useEffect(() => {
    async function fetchFavoritos() {
      try {
        const favoritosData = await getEditaisFavoritos(user.id);
        setFavoritos(favoritosData);
      } catch (error) {
        console.error("Erro ao buscar editais favoritados:", error);
      }
    }
    fetchFavoritos();
  }, [user.id]);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }
  const searchCards = (searchTerm: string) => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    const filtered = cardData.filter((card) =>
      card.nome.toLowerCase().includes(lowerCaseSearch)
    );

    setFilteredCards(filtered);
    console.log("Filtrando Cards", filtered); // Log para verificar dados filtrados
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

  const handleRemoveFavoriteClick = async (card: Edital) => {
    try {
      setSelectedEdital(card); 
      setShowConfirmation(true); 
    } catch (error) {
      console.error("Erro ao preparar remoção do favorito:", error);
    }
  };

  const removeFavoriteConfirmed = async () => {
    try {
      if (!selectedEdital) return;
      await removeEditalFavorito(user.id, selectedEdital.id);
      const updatedFavoritos = favoritos.filter(fav => fav.id !== selectedEdital.id);
      setFavoritos(updatedFavoritos);

      console.log(`Edital '${selectedEdital.nome}' removido dos favoritos.`);
    } catch (error) {
      console.error("Erro ao remover edital dos favoritos:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  function cancelRemoveFavorite() {
    setShowConfirmation(false);
  }

  return (
    <div className="relative ">
      <div className="min-h-screen bg-[#EBF4F6]">
        <HeaderOut fix={false} />
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
                className="relative block h-[600px] fill-[#F5F5F5]"
              ></path>
            </svg>
          </div>
        </section>
        <div className="absolute top-28 w-full justify-between flex">
          <div className="bg-[#F5F5F5] w-[28vw] ml-16 h-[80vh] rounded-xl shadow-2xl flex flex-col items-center">
            <div className="items-center flex justify-center my-5">
              <FaRegStar className="mr-2 items-center flex text-[#088395]" size={20} />
              <h2 className="font-bold text-xl text-[#088395] font-sans">Favoritos</h2>
              <div className="border-t-2 border-gray-50"></div>
            </div>
            <div className="flex justify-center w-full px-4">
              <div className="flex border border-[#C0C0C0] justify-center items-center bg-white w-full rounded-2xl pl-2 pr-2 py-1 mb-6">
                <input
                  type="text"
                  placeholder="Buscar editais..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-gray-400 text-md pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-1 px-1"
                />
                <button
                  onClick={onClickSearch}
                  className="flex items-center justify-center bg-[#37B7C3] hover:bg-[#088395] rounded-xl px-6 py-2"
                >
                  <FaSearch className="text-white" />
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full px-5 overflow-y-scroll" style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }} >
              {favoritos.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#C0C0C0] shadow-md p-4 mb-3 cursor-pointer"
                  onClick={() => showEditais(card)}
                  onMouseOver={() => setIsHovered(true)}
                  onMouseOut={() => setIsHovered(false)}
                >
                  <h2 className="text-lg font-semibold text-[#333333]">{card.nome}</h2>
                  <p className="text-sm text-gray-500">{card.dataPublicacao}</p>
                  <div className={"items-end justify-end flex"}>
                  {isHovered ? (
                    <FaRegStar
                      className="text-[#088395] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavoriteClick(card);
                      }}
                    />
                  ) : (
                    <FaStar className="text-[#088395] cursor-pointer" />
                  )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isEditaisVisible && selectedCard && (
          <div className="bg-[#F5F5F5] w-[60vw] mr-16 h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-y-scroll" style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }}>
            <div className="flex items-center justify-center mt-8">
              {selectedCard.idOrgaoFomento === 1 ? (
                <Image src={Marca_FACEPE} alt="Marca FACEPE" width={250} height={250} />
              ) : (
                <Image src={FINEP} alt="FINEP" width={50} height={50} />
              )}
            </div>
            <div className="flex text-center flex-row items-center justify-center w-full mt-6">
                <p className="font-bold text-lg text-center">{selectedCard.nome}</p>
              </div>
              <div className="ml-12 mt-12">
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
                  <p className="mb-1 font-semibold">Categoria:</p>
                </div>
                <div className="flex">
                  <p className="mb-1 font-semibold">Público-alvo:</p>
                </div>
                <div className="flex">
                  <p className="mb-1 font-semibold">Data Inicial:</p>
                </div>
                <div className="flex">
                  <p className="mb-1 font-semibold">Data Final:</p>
                </div>
              </div>
          </div>
          )}
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Confirmação</h2>
              <p className="mb-4">Tem certeza de que deseja remover este edital dos favoritos?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white rounded-md px-4 py-2 mr-2"
                  onClick={removeFavoriteConfirmed}
                >
                  Remover
                </button>
                <button
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                  onClick={cancelRemoveFavorite}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
