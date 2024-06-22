"use client"
import React, { useState } from 'react';
import { createUser } from '../lib/api';
import {BiUser} from 'react-icons/bi';
import {AiOutlineLock} from 'react-icons/ai';
import Image from 'next/image';
import { Header } from "./Header";
import Link from 'next/link';
import {MdOutlineEmail} from 'react-icons/md';

export function DashEditais() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await createUser(name, email, password);
    console.log(response);
    if (response){
        alert("Cadastro Realizado com sucesso!")
    } else {
        alert("Conta já cadastrada")
    }
  }

  return (
    <div className='relative h-screen '>
    </div>
  );
}