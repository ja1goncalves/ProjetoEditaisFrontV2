"use client";
import React, { useEffect, useState } from "react";
import { getEditaisId, getUserLogin, urlBase } from "../lib/api";
import { CardsGrid, CardsRow } from "./Cards";
import { HeaderOut } from "./Header";
import { IoGrid } from "react-icons/io5";
import { MdTableRows } from "react-icons/md";
import { FaSearch, FaFilter } from "react-icons/fa";
import { parseCookies } from 'nookies'
import decode from "jwt-decode";

type User = {
  id: number,
  login: string,
  nome: string,
  idPerfil: number,
  senha: string
};

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
  criadoPorBot: boolean,
  link: string
}

export function Search() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cardData, setCardData] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  const [vizualizacao, setVizualizacao] = useState("row");

  useEffect(() => {
    const { 'engsoft.token': token } = parseCookies()
    if(token){
      const user: User = decode(token)
      setUser(user)
    }
  },[])

  useEffect(() => {
    getUserLogin('Bot').then((result) => {
      console.log(result)
      getEditaisId(result.id).then((result2) => {
        console.log(result2)
        const newEditais = result2.map((edital: Card) => ({
          id: edital.id,
          nome: edital.nome,
          categoria: edital.categoria,
          publicoAlvo: edital.publicoAlvo,
          area: edital.area,
          dataPublicacao: edital.dataPublicacao,
          dataInicial: edital.dataInicial,
          dataFinal: edital.dataFinal,
          resultado: edital.resultado,
          idOrgaoFomento: edital.idOrgaoFomento,
          criadoPorBot: edital.criadoPorBot,
          idUsuario: edital.idUsuario,
          link: `${urlBase}edital/${edital.id}/pdf`
        }));
        setCardData(newEditais);
        setFilteredCards(newEditais);
      })
    });
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

  const onClick = () => {
    searchCards(searchTerm);
  };

  return (
    <>
      <div className="relative">
        <div className="min-h-screen">
          <HeaderOut fix={true} />
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="w-full h-[70vh] bg-[#088395]" />
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

          <div className="absolute top-[14.58vh] w-[100vw]">
            <div className="flex flex-col justify-center">
              <p className="text-white text-5xl font-semibold px-8 lg:px-96 pb-8 text-center">
                Pesquisar
              </p>
              <p className="text-white font-[400] text-2xl pb-10 px-8 lg:px-96 text-center">
                Descubra editais relevantes para você
              </p>
            </div>
            {/* -------------- BARRA DE PESQUISA -------------- */}
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-8 px-4 lg:px-40">
                <div className="flex items-center bg-white w-full rounded-2xl pl-3 pr-2 py-2 mr-6">
                  <input
                    type="text"
                    placeholder="Buscar editais..."
                    className="text-gray-400 text-lg pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-[1em]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={onClick}
                    className="flex items-center justify-center bg-[#37B7C3] rounded-2xl px-5 py-5 lg:px-16 lg:py-7"
                  >
                    <FaSearch className="text-white" />
                  </button>
                </div>
                <button className="flex items-center justify-center bg-white rounded-2xl px-6 py-7 lg:px-10 lg:py-9">
                  <FaFilter className="text-[#37B7C3]" />
                </button>
              </div>

              {/* -------------- DASHBOARD -------------- */}
              <div className="flex flex-col mx-4 lg:mx-40 rounded-3xl bg-white border-2 border-[#088395] mb-16">
                <div className="border-b flex flex-row w-full items-center justify-between px-4 lg:px-24 py-4">
                  <p className="text-lg lg:text-xl">
                    Total de {filteredCards.length} editais disponíveis
                  </p>
                  <div className="bg-[#37B7C3] text-white flex items-center justify-around p-2 rounded-full lg:w-48 lg:h-14">
                    <button
                      onClick={() => setVizualizacao("grid")}
                      className={`p-2 lg:p-3 hover:opacity-60 ${vizualizacao == "grid" && "opacity-60"}`}
                    >
                      <IoGrid size={20} />
                    </button>
                    <div className="border-l h-6 mx-2 border-white"></div>
                    <button
                      onClick={() => setVizualizacao("row")}
                      className={`p-2 lg:p-3 hover:opacity-60 ${vizualizacao == "row" && "opacity-60"}`}
                    >
                      <MdTableRows size={24} />
                    </button>
                  </div>
                </div>
                <div
                  className={`${vizualizacao == "grid" ? "grid grid-cols-2" : "flex flex-col"} m-10 gap-x-20 gap-y-10 max-h-[80vh] overflow-scroll`}
                >
                  {filteredCards.map((card, index) =>
                    vizualizacao === "grid" ? (
                      <CardsGrid
                        key={index}
                        id={card.id}
                        nome={card.nome}
                        categoria={card.categoria}
                        publicoAlvo={card.publicoAlvo}
                        area={card.area}
                        dataPublicacao={card.dataPublicacao}
                        dataInicial={card.dataInicial}
                        dataFinal={card.dataFinal}
                        resultado={card.resultado}
                        idOrgaoFomento={card.idOrgaoFomento}
                        idUsuario={card.idUsuario}
                        criadoPorBot={card.criadoPorBot}
                        link={card.link}
                        filteredCards = {filteredCards}
                        setFilteredCards = {setFilteredCards}
                        logged = {user?.idPerfil==2?(true):(false)}
                      />
                    ) : vizualizacao === "row" ? (
                      <CardsRow
                        key={index}
                        id={card.id}
                        nome={card.nome}
                        categoria={card.categoria}
                        publicoAlvo={card.publicoAlvo}
                        area={card.area}
                        dataPublicacao={card.dataPublicacao}
                        dataInicial={card.dataInicial}
                        dataFinal={card.dataFinal}
                        resultado={card.resultado}
                        idOrgaoFomento={card.idOrgaoFomento}
                        idUsuario={card.idUsuario}
                        criadoPorBot={card.criadoPorBot}
                        link={card.link}
                        filteredCards = {filteredCards}
                        setFilteredCards = {setFilteredCards}
                        logged = {user?.idPerfil==2?(true):(false)}
                      />
                    ) : null
                  )}
                </div>
              </div>
              <div className="mt-32 w-full h-[8vh] bg-[#088395]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}