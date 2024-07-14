"use client";
import React from "react";

export function Footer() {
  return (
    <>
      <footer className=" pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl mb-6 text-[#1d7982]">INFORMAÇÕES</h3>
            <div className="flex space-x-12">
              <ul>
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
              <ul>
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
          <div className="pb-4">
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
            <div className="flex space-x-4">
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
