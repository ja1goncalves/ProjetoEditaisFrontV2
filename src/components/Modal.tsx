import React from "react";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className=" w-auto fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg w-1/2 h-auto z-50">
        {/* Conteúdo do modal */}
        <h2 className="text-2xl font-semibold mb-4 font-sans text-[#088395]">Adicionar Filtro</h2>
        <hr className="border-t-1 border-[#BEBEBE] my-4" />
        <div></div> {/* Filtros selecionados (?) */}
        <hr className="border-t-1 border-[#BEBEBE] my-4" />
        <div className="mb-4">
          <h2 className="text-xl mb-2">Órgão</h2>
          <div className="flex items-center justify-between">
            <select
              className="block appearance-none w-1/2 bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
              <option value="">Selecione uma opção</option>
              <option value="option1">FACEPE</option>
              <option value="option2">FINEP</option>
              <option value="option3">SECTI</option>
            </select>
          </div>
        </div>
        <hr className="border-t-1 border-[#BEBEBE] my-4" />
        <div className="mb-4">
          <h2 className="text-xl mb-2">Modalidade</h2>
          <div>
            <select
              className="block appearance-none w-1/2 bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
              <option value="">Selecione uma opção</option>
              <option value="option1">IPECTI</option>
              <option value="option2">APQ</option>
              <option value="option3">Outros</option>
            </select>
          </div>
        </div>
        <hr className="border-t-1 border-[#BEBEBE] my-4" />
        <div className="mb-4">
          <h2 className="text-xl mb-2">Status</h2>
          <div className="justify-between">
            <label className='items-center'><input type="checkbox" className='mr-2 bg-[#D9D9D9] border-none rounded-sm'/>Em Andamento</label>
            <label className='items-center' ><input type="checkbox" className='mr-2 ml-6 bg-[#D9D9D9] border-none rounded-sm'/>Finalizado</label>
          </div>
        </div>
        <hr className="border-t-1 border-[#BEBEBE] my-4" />
        <div className="mb-4">
          <h2 className="text-xl mb-2">Período</h2>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#088395] text-white rounded-lg text-left ml-auto flex">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Modal;
