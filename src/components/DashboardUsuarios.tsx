'use client'
import { useEffect, useState } from 'react';
import { NovoUsuario } from './NovoUsuario';
import { User } from  './User';
import { deleteUser, getUsers } from '@/lib/api';


export function DashboardUsuarios(){

  const [user, setUser] = useState<{ id: number; login: string; nome: string; idPerfil: number;}[]>([])
  const [newUser, setNewUser] = useState(false)
  
  interface User {
    id: number, 
    login: string, 
    nome: string, 
    idPerfil: number
  }

  function handleDeleteUser(id: number, login:string) {
    if (confirm(`Deseja apagar o email: "${login}"?`) == true) {
      deleteUser(id)
      const updatedUser = user.filter((us) => us.id !== id);
      setUser(updatedUser);
      alert("Usuário remodivo!");
    } 
  }

  useEffect(() => {
    getUsers().then((result) => {
      console.log(result)
      const newUsers = result.map((user: User) => ({
        id: user.id,
        nome: user.nome,
        login: user.login,
        idPerfil: user.idPerfil,
      }));
      setUser(newUsers);
    });
  }, [newUser]);
  
  


  return(
    <div className="px-7 py-6 rounded-xl w-full h-full">
      <div className="w-full grid grid-cols-3 items-center border-b mb-6 pb-5">
        <div/>
        <p className="text-xl text-center font-semibold">Usuários Cadastrados</p>
        <div>
          <NovoUsuario setNewUser={setNewUser} newUser={newUser}/>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-10 gap-y-10 overflow-scroll max-h-[90%]">
        {user.map((us)=>{
            return (<User key={us.id} onDelete={() => handleDeleteUser(us.id, us.login)} id={us.id} nome={us.nome} login={us.login} idPerfil={us.idPerfil}/>)
          })}
      </div>

    </div>
  )}