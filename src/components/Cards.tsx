import React from "react";
import Image from "next/image";

import facepe from "../../public/images/Marca-FACEPE.png";
import { VerMais } from "./VerMais";

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

export function CardsGrid(props:CardsProps){
  return (
    <div className="border rounded-lg shadow-md bg-[#D9D9D9] h-[38vh]">
      <div className="relative border-b px-10">
        <Image src={facepe} alt={props.nome} className="object-fill" />
      </div>
      <div className="flex flex-col gap-y-5 items-center py-6 px-6">
        <h3 className="text-xl font-semibold text-center h-[5vh]">{props.nome}</h3>
        <div className="flex flex-row items-center w-full justify-between">
          <p className="text-gray-600">Publicação: {props.dataPublicacao}</p>
          <button className="flex justify-center gap-x-3 leading-none border-none outline-none rounded-xl bg-[#088395] text-left px-8 py-2 text-lg text-white items-center cursor-pointer hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
};

export function CardsRow(props:CardsProps){
  return (
    <div className="border rounded-lg shadow-md w-full flex flex-row">
      <div className="relative border-r px-5 w-[30%] items-center flex flex-row">
        <Image src={facepe} alt={props.nome} />
      </div>
      <div className="flex flex-col w-full items-center gap-y-6 py-3 px-6">
        <h3 className="text-xl font-semibold w-full text-left">{props.nome}</h3>
        <div className="flex flex-row items-center w-full justify-between">
          <p className="text-gray-600">Publicação: {props.dataPublicacao}</p>
          <VerMais
            nome={props.nome}
            categoria={props.categoria}
            publicoAlvo={props.publicoAlvo}
            area={props.area}
            dataPublicacao={props.dataPublicacao}
            dataInicial={props.dataInicial}
            dataFinal={props.dataFinal}
            resultado={props.resultado}
            idOrgaoFomento={props.idOrgaoFomento}
            criadoPorBot={props.criadoPorBot}
            link={props.link}
            />
        </div>
      </div>
    </div>
  );
};