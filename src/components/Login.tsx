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
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#F0F3FF]'>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <div className='w-full md:w-3/5 p-6 md:p-10'>
            <div className='text-left font-bold'>
              <span>LogoApp</span>
            </div>
            <div className='py-6 md:py-10'>
              <h2 className='text-3xl font-bold text-[#7D0A0A] mb-2'>Acesse sua conta</h2>
              <div className='border-2 w-10 border-[#7D0A0A] inline-block mb-8'></div>
              <div className='flex flex-col items-center text-left'>
                <div className="relative my-4 w-4/5">
                  <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="peer border-gray-300 rounded-md px-3 py-2 w-full block text-sm text-[#7D0A0A] bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#BF3131]" placeholder=" " />
                  <label className="absolute text-sm text-[#7D0A0A] duration-300 transform -translate-y-6 scale-75 top-1 origin-[0] peer-focus:left-0 peer-focus:text-[#7D0A0A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                  <MdOutlineEmail className='absolute top-3 right-4 text-[#7D0A0A]'/>
                </div>
                <div className="relative my-4 w-4/5">
                  <input 
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="peer border-gray-300 rounded-md px-3 py-2 w-full block text-sm text-[#7D0A0A] bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#BF3131]" placeholder=" " />
                  <label className="absolute text-sm text-[#7D0A0A] duration-300 transform -translate-y-6 scale-75 top-1 origin-[0] peer-focus:left-0 peer-focus:text-[#7D0A0A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-6">Senha</label>
                  <AiOutlineLock className='absolute top-3 right-4 text-[#7D0A0A]'/>
                </div>
              </div>
              <div className='flex justify-between w-full mb-1'>
                  <label className='flex items-center text-xs'><input type='checkbox' name='lembre-se' className='mr-2 ml-12'/>Lembre-se de mim</label>
                  <Link href={'/ForgotPassword'} className='text-xs mr-12 hover:text-[#7D0A0A] hover:underline'>Esqueci minha senha</Link>
              </div>
              <button type="submit" className='w-1/2 mb-4 text-[18px] mt-6 rounded-full border-4 border-[#7D0A0A] px-4 bg-transparent text-[#7D0A0A] hover:bg-[#7D0A0A] hover:border-[#7D0A0A hover:text-white py-2 transition-colors duration-300'>Entrar</button>
            </div>
          </div>
          <div className='w-full md:w-2/5 bg-[#7D0A0A] text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12'>
            <h2 className='text-3xl font-bold mb-2'>Novo aqui?</h2>
            <div className='border-2 w-10 border-white inline-block mb-2'></div>
            <p className='mb-8'>Crie sua conta e receba os melhores editais de tecnologia diretamente.</p>
            <button type="submit" className='w-full mb-4 text-[18px] mt-6 rounded-full border-4 border-white px-4 bg-transparent text-white hover:bg-[#F5F5F5] hover:border-[#F5F5F5] hover:text-[#BF3131] py-2 transition-colors duration-300'>Cadastre-se</button>
          </div>
        </div>
      </main>
    </div>
  );
}

