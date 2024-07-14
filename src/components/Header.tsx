"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { IoEnterOutline } from "react-icons/io5";
import { parseCookies } from "nookies";
import { IoIosHome } from "react-icons/io";

interface HeaderOutProps {
  fix: boolean;
}

interface HeaderInProps {
  adm: boolean;
  setPage: Function;
  curPage: string;
}

export function HeaderOut(props: HeaderOutProps) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const { "engsoft.token": token } = parseCookies();
    if (token) {
      setLogged(true);
    }
  }, []);

  return (
    <div
      className={`${props.fix ? "fixed bg-[#088395] bg-opacity-60" : "absolute"} flex justify-center w-full text-white font-semibold text-xl py-3 bg-opacity-90 top-0 z-40`}
    >
      <div className="container h-full px-8 lg:px-0">
        <div className="flex items-center h-full justify-between">
          <Link href="/">
            <p className="flex flex-row items-center gap-x-2">
              EditalView <FaRegEye />
            </p>
          </Link>
          <ul className={`hidden lg:flex gap-x-6 items-center justify-center`}>
            <li>
              <Link href="/">
                <p className={`/`}>Início</p>
              </Link>
            </li>
            <li>
              <Link href={`/search`}>
                <p className={``}>Editais Disponíveis</p>
              </Link>
            </li>
            <li>
              <Link href={"/#sobre"}>
                <p className={``}>Sobre</p>
              </Link>
            </li>
          </ul>
          {!logged && (
            <Link href={"/login"}>
              <button className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                <IoEnterOutline /> Login
              </button>
            </Link>
          )}

          {logged && (
            <div className="flex flex-row justify-end gap-x-5 items-center">
              <Link
                href={`/dashboard`}
                onClick={() => {
                  setLogged(false);
                }}
              >
                <button className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                  <AiOutlineDashboard /> Dashboard
                </button>
              </Link>
              <Link
                href={`/api/auth/logout`}
                onClick={() => {
                  setLogged(false);
                }}
              >
                <button className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                  <IoEnterOutline /> Sair
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeaderIn(props: HeaderInProps) {
  return (
    <div
      className={`flex justify-center w-full bg-[#E9EDF0] py-3 bg-opacity-90 fixed top-0 z-40`}
      style={{
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="container h-full px-8 lg:px-0">
        <div className="flex items-center h-full justify-between">
          <Link href="/">
            <p className="flex flex-row items-center gap-x-2">
              EditalView <FaRegEye />
            </p>
          </Link>
          <ul className={`hidden lg:flex gap-x-6 items-center justify-center`}>
            <li>
              <button onClick={() => props.setPage("editais")}>
                <p
                  className={`${props.curPage == "editais" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                >
                  Editais
                </p>
              </button>
            </li>
            <li className={`${!props.adm && "hidden"}`}>
              <button onClick={() => props.setPage("users")}>
                <p
                  className={`${props.curPage == "users" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                >
                  Usuários
                </p>
              </button>
            </li>
          </ul>
          <div className="flex flex-row justify-end gap-x-5 items-center">
            <Link href={`/`}>
              <button className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                <IoIosHome /> Inicio
              </button>
            </Link>
            <Link href={`/api/auth/logout`}>
              <button className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                <IoEnterOutline /> Sair
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
