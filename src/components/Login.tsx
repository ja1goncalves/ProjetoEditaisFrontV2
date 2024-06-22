"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';

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
        <div className='relative h-screen '>
          
        </div>
    );
}

