"use client";
import React from "react";

export function Footer() {
  return (
    <>
      <footer className="pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between text-center md:text-left">
          <div className="mb-6 md:mb-0 w-full md:w-auto">
            <h3 className="text-xl mb-6 text-[#1d7982]">INFORMAÇÕES</h3>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
              <ul className="flex-1">
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Página Inicial
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Editais Disponíveis
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Sobre
                  </a>
                </li>
              </ul>
              <ul className="flex-1">
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Política de Privacidade
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Política de Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-auto pb-4 mt-10 md:mt-0 md:ml-2">
            <h3 className="text-xl mb-6 text-[#1d7982]">CONTATO</h3>
            <p className="mb-2">
              Queremos ouvir de você! Envie suas perguntas, comentários ou
              sugestões.
            </p>
            <p className="mb-4">
              <strong>Envie sua Mensagem</strong>
            </p>
            <p className="mb-4">Ou contate-nos por outros meios:</p>
            <p className="mb-4">
              <a
                href="mailto:Contato@EditalView.upe.br"
                className="text-gray-600 hover:text-gray-800"
              >
                Contato@EditalView.upe.br
              </a>
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="p-7 bg-[#088395] w-full"></div>
      </footer>
    </>
  );
}
