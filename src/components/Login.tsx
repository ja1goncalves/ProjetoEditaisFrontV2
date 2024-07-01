"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { MdOutlineEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';

function generateRandomToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const success = await loginUser(email, password);
      if (success == true) {
        const token = generateRandomToken();
        localStorage.setItem('token', token);
        router.push('/dashclientes'); 
      } else {
        alert("Credencial inválida!")
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#EBF4F6]'>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <div className='w-full md:w-3/5 p-6 md:p-10'>
            <div className='text-left font-bold'>
              <span>LogoApp</span>
            </div>
            <div className='py-6 md:py-10'>
              <h2 className='text-3xl text-left font-sans ml-12 text-[#088395] mb-6'>Acesse sua conta</h2>
              <div className='flex flex-col items-center text-left'>
              <div className="relative my-4 w-4/5">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]" 
                    placeholder=" " 
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  <label className="absolute text-sm text-[#1C1C1C] peer-focus:opacity-0  top-2 origin-[0] left-10 ">E-mail</label>
                </div>
                <div className="relative my-4 w-4/5">
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]" 
                    placeholder=" " 
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  <label className="absolute text-sm text-[#1C1C1C] peer-focus:opacity-0  top-2 origin-[0] left-10 ">Senha</label>
                </div>
              </div>
              <div className='flex justify-between w-full mb-1'>
                  <label className='flex items-center text-xs'><input type='checkbox' name='lembre-se' className='mr-2 ml-12'/>Lembre-se de mim</label>
                  <Link href={'/ForgotPassword'} className='text-xs mr-12 hover:text-[#088395] hover:underline'>Esqueci minha senha</Link>
              </div>
              <button type="submit" className='w-48 mb-4 text-[18px] mt-6 rounded-xl bg-gradient-to-r from-[#37B7C3] to-[#088395] px-4 text-white font-semibold font-sans py-2 '>Entrar</button>
            </div>
            <span className='text-[#1C1C1C] text-left font-sans'>Não tem uma conta? <Link className='hover:text-[#088395] font-sans text-left hover:underline font-bold' href={'/cadastro'}>Cadastre-se</Link></span>
          </div>
          <div className='w-full md:w-2/5  bg-gradient-to-r from-[#37B7C3] to-[#088395] text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12'>
          </div>
          
        </div>
      </main>
    </div>
  );
}

