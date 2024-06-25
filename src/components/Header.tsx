"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TextProps {
  url: string;
  setUrl: (url: string) => void;
}

export function Header(props: TextProps) {
  return (
    <div 
      className={`flex justify-center w-full bg-[#E9EDF0] py-3 bg-opacity-90 fixed top-0 z-40`} 
      style={{
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
        transition: 'opacity 0.3s ease-in-out',
      }}>
      <div className="container h-full px-8 lg:px-0">
        <div className="flex items-center h-full justify-between">
          <button onClick={() => props.setUrl("inicio")}>
            LOGO
          </button>

         

          <button
            className="flex flex-row items-center gap-x-9 rounded-lg py-1 px-4 hover:opacity-60 hover:bg-gray-100"
            style={{
              boxShadow: 'inset -5px -5px 5px rgba(255, 255, 255, 0.3), inset 5px 5px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            Usuário
          </button>
        </div>
      </div>
    </div>
  );
}