import React, { useState } from "react";
import { MdKey } from "react-icons/md";

interface SenhaModalProps{
  admin: boolean,
  id: number,
}

export function RedefinirSenha(props:SenhaModalProps) {

  const [showModal, setShowModal] = useState(false);
  const [showSenhas, setShowSenhas] = useState(false);
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')
  const [senhaAtual, setSenhaAtual] = useState('')
  const [senhaIncorreta, setSenhaIncorreta] = useState(false)
  const [senhaDif, setSenhaDif] = useState(false)

  /*async function handleRedefinirSenha(admin:boolean, id:string){
    if(!senhaDif){
      if(!admin){
        const result = await changePass(senhaAtual, confirmarNovaSenha);
        
        if(!result){
          setSenhaIncorreta(true)
        }
      }
      else{
        const result = await changePassAdmin(confirmarNovaSenha, id);
        setShowModal(false)
        return result
      }
    }
  }*/


  function handleSenhaMismatch() {
    setConfirmarNovaSenha(confirmarSenha => {
      const senhaDif = confirmarSenha !== novaSenha;
      setSenhaDif(senhaDif);
      return confirmarSenha;
    });
  }
  
  function resetModal(){
    setShowModal(true)
    setSenhaIncorreta(false)
    setSenhaDif(false)
    setShowSenhas(false)
    setNovaSenha('')
    setConfirmarNovaSenha('')
    setSenhaAtual('')
  }

  return (
    <>
      {props.admin ? (
        <button title="Redefinir senha" className='text-xl bg-green-400 p-2 rounded-full hover:opacity-70' onClick={() => resetModal()}><MdKey/></button>
       ):(
        <button 
        title="Redefinir senha"
        onClick={() => resetModal()}
        className={`mt-10 w-full py-1 hover:underline items-center flex gap-6 pl-6`}>Redefinir senha
        </button> 
      )}
          
      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[35rem] ${props.admin ?("h-[26rem]"):("h-[31rem]")} pt-16`}>

              <div className="text-black font-bold text-2xl text-center mb-12"> 
                Redefinir senha
              </div > 

              <div className="mx-28 mt-6">
                <form 
                  onSubmit={(e)=>{
                    e.preventDefault()
                    //handleRedefinirSenha(props.admin, props.id)
                  }}
                  id="telefone" 
                  className="flex flex-1 flex-col gap-2">

                  <input className="border-transparent focus:border-green-1100 focus:border-1 focus:ring-0 bg-white border-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight" 
                            id="userNewPass" 
                            type={showSenhas ? 'text' : 'password'} 
                            placeholder="Nova senha"
                            value={novaSenha}
                            onChange={(e)=>{setNovaSenha(e.target.value);setSenhaDif(false)}}
                            required
                            title="Inserir nova senha"/>
                  
                  <input className={`${senhaDif ? 'focus:border-red-500 border-red-500' : 'focus:border-green-1100 border-transparent'} focus:ring-0 bg-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight`}
                            id="userNewPassConfirm" 
                            type={showSenhas ? 'text' : 'password'} 
                            placeholder="Confirmar senha"
                            value={confirmarNovaSenha}
                            onChange={(e)=>{setConfirmarNovaSenha(e.target.value); handleSenhaMismatch()}}
                            required
                            title="Confirmar nova senha"/>
                  
                  {!props.admin && (
                    <input className={`${senhaIncorreta ? 'focus:border-red-500 border-solid border-red-500' : 'focus:border-green-1100 border-transparent'} mt-3 focus:ring-0 bg-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight`}  
                            id="userPrevPass" 
                            type={showSenhas ? 'text' : 'password'} 
                            placeholder="Senha atual"
                            value={senhaAtual}
                            onChange={(e)=>{setSenhaAtual(e.target.value);setSenhaIncorreta(false)}}
                            required
                            title="Senha atual"/>
                  )}
                  <label htmlFor="showPass" className="mt-3 flex items-center gap-3 text-base text-gray-800 hover:text-gray-400">
                    <input onChange={() =>setShowSenhas(!showSenhas)} type="checkbox" name="showPass" id="showPass" className="h-4 w-4 rounded-sm border-gray-400 text-green-1100"/>
                    Mostrar Senhas
                  </label>
                  
                  <button 
                    title="Salvar"
                    type="submit" 
                    className='mt-5 inline-block rounded-lg font-bold bg-green-1100 hover:bg-green-1200 px-5 py-2 leading-none text-white'>
                    Salvar
                  </button>

                  <button 
                    title="Fechar"
                    type="button" 
                    className='mt-1 inline-block rounded-lg font-bold text-green-1100 hover:text-green-1200 hover:underline px-5 py-2 leading-none'
                    onClick={() => setShowModal(false)}>
                    Fechar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}