import React, { useState } from "react";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png'
import FINEP from '../../public/images/FINEP.png'
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";

interface CardsProps {
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

export function VerMais(props:CardsProps) {

  const [showModal, setShowModal] = useState(false);
  
  function resetModal(){
    setShowModal(true)
  }

  return (
    <>
      <button onClick={() => resetModal()} className="flex justify-center gap-x-3 leading-none border-none outline-none rounded-xl bg-[#088395] px-8 py-2 text-lg text-white items-center cursor-pointer hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus">
        Ver mais
      </button>
          
      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[45rem] h-[35rem]`}>
              <div className={`flex bg-white flex-col px-10  gap-8 rounded-xl w-full h-full overflow-y-scroll`}>
                <div className=" flex flex-col w-full justify-center px-6 pt-5 rounded-lg gap-y-5">
                
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
                    <p className="font-bold text-lg">{props.nome}</p>
                  </div>

                  <div className=" gap-x-10">
                    <div className="flex">
                      <p className="mb-1 font-semibold">Publicação:</p>
                      <p className="ml-1">{props.dataPublicacao}</p>
                    </div>
                    <div className="flex">
                      <p className="mb-1 font-semibold">Órgão de Fomento:</p>
                      <p className="ml-1">{props.idOrgaoFomento === 1?('FACEPE'):('FINEP')}</p>
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

                  <div className="w-full flex flex-row items-center justify-between font-semibold">
                    <button onClick={()=>{setShowModal(false)}} className="mr-2 flex items-center px-3 py-2 rounded-md text-black text-semibold cursor-pointer border border-[#088395] hover:opacity-60">
                      Voltar
                    </button>

                    <a href={props.link} className="mr-2 flex items-center px-3 py-2 rounded-md text-white text-semibold cursor-pointer bg-[#088395] hover:opacity-60">
                      <FaFileDownload  className="mr-2"/> Baixar Edital
                    </a>
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