"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { MdOutlineEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';

export function ForgotPassword() {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#F0F3FF]'>
        <main className='flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center'>
          <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-3xl'>
            <div className='w-full md:w-full p-6 md:p-10'>
              <div className='text-left font-bold'>
                <span>LogoApp</span>
              </div>
              <div className='py-6 md:py-10'>
                <h2 className='text-3xl font-bold text-[#7D0A0A] mb-2'>Esqueceu sua senha?</h2>
                <div className='border-2 w-10 border-[#7D0A0A] inline-block mb-3'></div>
                <p className='text-gray-300 mb-3'>Enviaremos um email com instruções de como redefinir sua senha.</p>
                <div className='flex flex-col items-center text-left'>
                  <div className="relative my-4 w-80">
                    <input 
                      type="email"
                      className="peer border-gray-300 rounded-md px-3 py-2 w-full block text-sm text-[#7D0A0A] bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#BF3131]" placeholder=" " />
                    <label className="absolute text-sm text-[#7D0A0A] duration-300 transform -translate-y-6 scale-75 top-1 origin-[0] peer-focus:left-0 peer-focus:text-[#7D0A0A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                    <MdOutlineEmail className='absolute top-3 right-4 text-[#7D0A0A]'/>
                  </div>
                </div>
                <button type="submit" className='w-2/12 mb-4 text-[18px] mt-6 rounded-full border-4 border-[#7D0A0A] px-4 bg-transparent text-[#7D0A0A] hover:bg-[#7D0A0A] hover:border-[#7D0A0A hover:text-white py-2 transition-colors duration-300'>Enviar</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  