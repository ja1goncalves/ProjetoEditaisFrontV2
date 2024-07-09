"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineLock } from 'react-icons/ai';
import { AuthContext } from "../app/contexts/AuthContext"
import { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

export function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext)
  const [badLogin, setBadLogin] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const router = useRouter()
  
  async function handleLogin(){
      try {
        await signIn({login, senha});
      } catch (error) {
        setBadLogin(true) 
      }
  };

  useEffect(() => {
    const { 'engsoft.token': token } = parseCookies()
    if(token){
      router.push('/dashboard')
    }
    setBadLogin(false)
  },[])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#EBF4F6]'>      
      <main className='flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <form className='w-full md:w-3/5 p-6 md:p-10' onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
            <div className='text-left font-bold'>
              <Link href={'/'} className="flex flex-row items-center gap-x-2 hover:opacity-60">EditalView <FaRegEye/></Link>
            </div>
            <div className='py-6 md:py-10'>
              <h2 className='text-3xl text-left font-sans ml-12 text-[#088395] mb-6'>Acesse sua conta</h2>
              <div className='flex flex-col items-center text-left'>
              <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input 
                    type="username" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)}
                    className="border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]" 
                    placeholder="Usuário" 
                    required
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  
                </div>
                <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input 
                    type={mostrarSenha?("username"):("password")} 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)}
                    className="hover:opacity-70 border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]" 
                    placeholder="Senha" 
                    required
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  
                </div>
              </div>
              <div className='flex flex-row justify-between pr-12 pl-5 w-full mb-1'>
                  <Link href={'/ForgotPassword'} className='text-xs hover:text-[#088395] hover:underline'>Esqueci minha senha</Link>
                  <button type="button" className='text-xl flex flex-row hover:opacity-60' onClick={(e)=>{e.preventDefault; setMostrarSenha(!mostrarSenha)}}>{mostrarSenha?(<IoMdEye />):(<IoMdEyeOff />)}</button>
              </div>
              <button type="submit" className='hover:opacity-70 w-48 mb-4 text-[18px] mt-6 rounded-xl bg-gradient-to-r from-[#37B7C3] to-[#088395] px-4 text-white font-semibold font-sans py-2 '>Entrar</button>
              {badLogin && (
              <div className="text-red-400 pt-3">
                Email ou senha incorreto(s)
              </div>
            )}
            </div>
            <span className='text-[#1C1C1C] text-left font-sans'>Não tem uma conta?</span> <Link href={'/register'} className='hover:text-[#088395] font-sans text-left hover:underline font-bold'>Cadastre-se</Link>
          </form>
          <div className='w-full md:w-2/5  bg-gradient-to-r from-[#37B7C3] to-[#088395] text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12'>
          </div>
          
        </div>
      </main>
    </div>
  );
}

