"use client"
import { Header } from "./Header";

import { useEffect, useState } from "react";
import React from 'react';;
import { COLORS } from '../../src/lib/AppStyles'
import { useRouter } from "next/navigation";


export function DashAdm(){
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token'); 

    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          
        } catch (error) {
          console.error('Error fetching client list:', error);
        }
      };
    fetchData();
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }


  return(
    <div>

    </div>
  )}