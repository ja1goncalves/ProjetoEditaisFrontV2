"use client"
import { HeaderIn } from "./Header";
import { useContext, useEffect, useState } from "react";
import React from 'react';;
import { COLORS } from '../../src/lib/AppStyles'
import { getEditais } from "@/lib/api";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContext";
import { DashboardUsuarios } from "./DashboardUsuarios";

interface Edital {
  id: string
  nome: string;
  orgaoDeFomento: string;
  area: string;
  dataIni: string;
  dataFim: string;
  dataResul: string;
}

export function DashAdm(){
  const router = useRouter()

  const userInfo = useContext(AuthContext).user

  const [currentPage, setCurrentPage] = useState("editais");


  const [newForm, setNewForm] = useState(0)

  const [editais, setEditais] = useState<Edital[]>([])


  const [nomeEdital, setNomeEdital] = useState('')
  const [orgaoEdital, setOrgaoEdital] = useState('')
  const [area, setArea] = useState('')
  const [dataIni, setDataIni] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [dataRes, setDataRes] = useState('')


  const [programResgateID, setResgateID] = useState("")

  const handleEditalUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);
    }
  };

  useEffect(() => {

      
  }, []);

  return(
    <div className={`bg-[${COLORS.bgDark}] h-[100vh] py-24`}>
      <HeaderIn adm={userInfo.idPerfil==2} setPage={setCurrentPage} curPage={currentPage}/>
      <div className={`h-full flex flex-row ${currentPage == "users"?('w-full justify-center'):('mx-11 justify-between gap-x-10')}`}>
        <div 
            className={`rounded-xl ${currentPage == "users"?('w-[80%] justify-center'):('w-[25%]')} flex flex-col items-center`}
            style={{
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
              transition: 'opacity 0.3s ease-in-out',
            }}>
            {(currentPage == "editais")&&(<h1 className="font-bold border-b border-b-gray-100 flex flex-row w-full justify-center py-3 text-xl">Novo Edital</h1>)}
            
            {(currentPage == "editais")&&
            (
              <>

                <div className="overflow-y-scroll">
                  <form className="flex flex-col justify-start w-full mt-6 mb-4">
                    <label htmlFor="nomeEdital" className={`text-generic-fields font-bold`}>Nome do Edital</label>
                    <div className="relative mt-2 mb-8 w-full">
                      <input className={`focus:ring-0 focus:outline-none focus:border-gray-600 appearance-none leading-tight border border-gray-200 placeholder:text-generic-fields placeholder:font-semibold w-full outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight focus:opacity-60 hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                                id="nomeEdital" 
                                value={nomeEdital}
                                onChange={(e) => setNomeEdital(e.target.value)}
                                required/>
                    </div>

                    <label htmlFor="orgaoEdital" className={`text-generic-fields font-bold`}>Orgão de Fomento</label>
                    <div className="relative mt-2 mb-8 w-full">
                      <input className={`focus:ring-0 focus:outline-none focus:border-gray-600 appearance-none leading-tight border border-gray-200 placeholder:text-generic-fields placeholder:font-semibold w-full outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight focus:opacity-60 hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                                id="orgaoEdital" 
                                value={orgaoEdital}
                                onChange={(e) => setOrgaoEdital(e.target.value)}
                                required/>
                    </div>

                    <label htmlFor="orgaoEdital" className={`text-generic-fields font-bold`}>Área</label>
                    <div className="relative mt-2 mb-8 w-full">
                      <input className={`focus:ring-0 focus:outline-none focus:border-gray-600 appearance-none leading-tight border border-gray-200 placeholder:text-generic-fields placeholder:font-semibold w-full outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight focus:opacity-60 hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                                id="orgaoEdital" 
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required/>
                    </div>

                    <div>
                      <label htmlFor="dataIni" className={`text-generic-fields font-bold`}>Inicio</label>
                      <div className="relative mt-2 mb-8 w-full">
                        <input
                            className="focus:ring-0 focus:outline-none focus:border-gray-600 appearance-none leading-tight border border-gray-200 placeholder:text-generic-fields placeholder:font-semibold w-full outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight focus:opacity-60 hover:shadow-input-hover-focus focus:shadow-input-hover-focus"
                            id="dataIni"
                            type="date"
                            autoComplete="off"
                            placeholder=""
                            title=""
                            required
                            value={dataIni}
                            onChange={(e) => setDataIni(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dataFim" className={`text-generic-fields font-bold`}>Fim</label>
                      <div className="relative mt-2 mb-8 w-full">
                        <input
                            className="focus:ring-0 focus:outline-none focus:border-gray-600 appearance-none leading-tight border border-gray-200 placeholder:text-generic-fields placeholder:font-semibold w-full outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight focus:opacity-60 hover:shadow-input-hover-focus focus:shadow-input-hover-focus"
                            id="dataFim"
                            type="date"
                            autoComplete="off"
                            placeholder=""
                            title=""
                            required
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dataRes" className={`text-generic-fields font-bold`}>Resultado</label>
                      <div className="relative mt-2 mb-8 w-full">
                        <input
                            className="focus:ring-0 focus:outline-none focus:border-gray-600 appearance-none leading-tight border border-gray-200 placeholder:text-generic-fields placeholder:font-semibold w-full outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight focus:opacity-60 hover:shadow-input-hover-focus focus:shadow-input-hover-focus"
                            id="dataRes"
                            type="date"
                            autoComplete="off"
                            placeholder=""
                            title=""
                            required
                            value={dataRes}
                            onChange={(e) => setDataRes(e.target.value)}
                        />
                      </div>
                    </div>

                    <label 
                      title="UparEdital"
                      className={`flex justify-center gap-x-3 leading-none w-full border-none outline-none rounded-xl bg-gray-100 px-4 py-2 text-black items-center cursor-pointer mb-6 hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}
                    >
                      Upload PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        style={{ display: "none" }}
                        onChange={(e) => handleEditalUpload(e.target.files)}
                      />
                    </label>


                    <button 
                      title="Cadastrar"
                      type="submit" 
                      className={`leading-none w-full border-none outline-none rounded-xl bg-generic-tittleButton p-4 text-generic-bgLight font-bold cursor-pointer mb-6 hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}>
                      Cadastrar
                    </button>
                  </form>
                </div>

              </>
            )}

            {(currentPage == "users")&&
            (
              <DashboardUsuarios/>
            )}

        </div>

        {(currentPage != "users")&&
        (
        <div 
          className={`flex flex-col px-10 pb-10 pt-5 gap-8 rounded-xl w-[80%] overflow-y-scroll`}
          style={{
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
            transition: 'opacity 0.3s ease-in-out',
          }}>
            {(currentPage == "editais")&&<button className="w-full font-bold text-left">Editais</button>}


            {currentPage === "editais" &&editais.map((edital) => (
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
  )}