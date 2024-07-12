"use client"
import { useContext, useEffect, useState } from "react";
import { FaFileUpload, FaFilter, FaRegStar, FaSearch, FaStar } from "react-icons/fa";
import { getEditais } from "@/lib/api";
import { useRouter } from "next/navigation";
import { HeaderIn, HeaderOut } from "./Header";
import { COLORS } from '../../src/lib/AppStyles';
import Image from "next/image";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png'
import FINEP from '../../public/images/FINEP.png'
import { AuthContext } from "@/app/contexts/AuthContext";
import { userInfo } from "os";

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
    orgao: string;
  }


export function Teste(){
    const cardData: Card[] = [
        {
          title: "20/2024 - IPECTI: Cidades inteligentes e resilientes",
          publication: "6 de junho de 2024",
          orgao: "FACEPE",
        },
        {
          title: "18/2024 - APQ – Universal (Auxílio a Projetos de Pesquisa)",
          publication: "27 de maio de 2024",
          orgao: "FACEPE",
        },
        {
          title: "17/2024 - Apoio aos laboratórios multiusuários e aos acervos científicos de Pernambuco",
          publication: "30 de maio de 2024",
          orgao: "FACEPE",
        },
        {
          title: "that's my life life",
          publication: "25 de junho de 2024",
          orgao: "FACEPE",
        },
      ];

     const router = useRouter();

  const userInfo = useContext(AuthContext).user

  const [currentPage, setCurrentPage] = useState("editais");
  const [isEditaisVisible, setIsEditaisVisible] = useState(false);
  const [editais, setEditais] = useState<Edital[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEdital, setSelectedEdital] = useState<Edital | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<Card[]>(cardData);
  const [isFavorited, setIsFavorited] = useState(false);
  
  useEffect(() => {
    searchCards(searchTerm);
}, [searchTerm]);

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

  const filteredItems = cardData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                        <div className="flex border border-[#C0C0C0] justify-center items-center bg-white w-full rounded-2xl pl-2 pr-2 py-1 mb-3">
                            <input
                            type="text"
                            placeholder="Buscar editais..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-gray-400 text-md  pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-1 px-1"
                            />
                            <button
                            onClick={onClickSearch}
                            className="flex items-center justify-center bg-[#37B7C3] hover:bg-[#088395] rounded-xl px-6 py-2"
                            >
                            <FaSearch className="text-white" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-y-scroll bg-[#F5F5F5]" style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }}>
                        {filteredCards.map((card, index) => (
                            <div
                            key={index}
                            className="bg-white hover:bg-[#F0F0F0] rounded-xl p-3 m-3 mb-4 shadow-md flex flex-col justify-between cursor-pointer"
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
                                    <FaFileUpload className="hover:text-[#088395]"/>
                                    </label>
                                    <button className="text-[#37B7C3]" onClick={() => handleRemoveFavoriteClick(card)}>
                                    <FaStar className="hover:text-white" />
                                    </button>
                                </div>
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-xl font-bold text-[#333333] font-sans">{card.title}</h2>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p className="text-sm text-[#444444] font-sans">Publicação: {card.publication}</p>
                                </div>
                          </div>
                        ))}
                        <div className="items-center flex justify-center w-full mt-8 mb-5">
                                  <nav aria-label="Page navigation example">
                                    <ul className="inline-flex -space-x-px text-sm">
                                      <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-[#333333] bg-white border border-e-0 border-[#C0C0C0] rounded-s-lg hover:text-gray-700 dark:text-gray-400 hover:bg-[#088395] dark:hover:text-white">Anterior</a>
                                      </li>
                                      <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-[#333333] hover:bg-[#088395] bg-white hover:text-white border border-[#C0C0C0]">1</a>
                                      </li>
                                      <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-[#333333] bg-white border  border-[#C0C0C0] hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-[#088395] dark:hover:text-white">2</a>
                                      </li>
                                      <li>
                                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 hover:bg-[#088395] text-white border  border-[#C0C0C0] bg-[#088395] hover:text-blue-700  dark:text-white">3</a>
                                      </li>
                                      <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-[#333333] bg-white border hover:bg-[#088395] border-[#C0C0C0]  hover:text-gray-700 dark:text-gray-400 dark:hover:bg-[#088395] dark:hover:text-white">4</a>
                                      </li>
                                      <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-[#333333] bg-white border hover:bg-[#088395] border-[#C0C0C0] hover:text-gray-700  dark:text-gray-400 dark:hover:text-white">5</a>
                                      </li>
                                      <li>
                                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-[#333333] bg-white border  hover:bg-[#088395] border-[#C0C0C0] before: rounded-e-lg hover:text-gray-700 dark:text-gray-400 dark:hover:bg-[#088395] dark:hover:text-white">Próximo</a>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                    </div>
                </div>
                {isEditaisVisible && selectedCard && (
                    <div className="bg-[#F5F5F5] h-[80vh] w-[65vw] mx-11 shadow-xl rounded-xl overflow-y-scroll" style={{ maxHeight: '80vh', scrollbarWidth: 'thin' }}>
                        <div className="flex justify-center items-center mt-5">
                            {selectedCard.orgao === 'FACEPE' ? (
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
                        <div className="flex text-center flex-row justify-center w-full mt-4 mb-8">
                            <p className="font-bold text-lg text-[#333333]">{selectedCard.title}</p>
                        </div>
                        <div className="mx-8 gap-x-10">
                            <div className="flex">
                                <p className="mb-1 font-semibold text-[#333333]">Publicação:</p>
                                <p className="ml-1 text-[#444444]">{selectedCard.publication}</p>
                            </div>
                            <div className="flex">
                                <p className="mb-1 font-semibold text-[#333333]">Órgão de Fomento:</p>
                                <p className="ml-1 text-[#444444]">{selectedCard.orgao}</p>
                            </div>
                            <div className="flex">
                                <p className="mb-1 font-semibold text-[#333333]">Área:</p>
                            </div>
                            <div className="flex">
                                <p className="mb-1 font-semibold text-[#333333]">Modalidade:</p>
                            </div>
                            <div className="font-semibold mt-3 mb-1">
                                <p className="text-[#333333]">Descrição:</p>
                            </div>
                            <div className="border border-[#C0C0C0] rounded-sm h-[100px] overflow-y-scroll text-[#444444]" style={{ maxHeight: '100px', scrollbarWidth: 'thin' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end mx-5 my">
                            <label className="mr-2 font-sans font-semibold flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#088395] hover:bg-[#005f73] mb-5">
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
                )}
            </div>
        </div>
        {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-96">
            <p className="text-lg font-semibold mb-2 text-center">Tem certeza que deseja remover este edital dos favoritos?</p>
            <p className="text-sm mb-4 text-center">Ao fazer isso, arquivos anexados serão removidos.</p>
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