import axios from "axios";

const urlBase = "http://127.0.0.1:8000/api/"

export async function createClient(id:number, nome: string, cpf: string, logradouro: string, numero: string, estado: string, cidade: string, cep: string) {
  const response = await api.post('/cliente/create', {
    id: `${id}`,
    nome: nome,
    cpf: cpf,
    logradouro: logradouro,
    numero: numero,
    estado: estado,
    cidade: cidade,
    cep: cep,
  });

  return response;
}

export async function getClientInfo(id: string) {
  const response = await api.get('/cliente/'+id, {});
  return response.data;
}

export async function getClientList() {
  try {
    const response = await api.get('/clientes', {});
    return response.data;
  } 
  catch (error) {
    return false
  }
}

export async function updateClient(id:number, nome: string, cpf: string, logradouro: string, numero: string, estado: string, cidade: string, cep: string) {
  const response = await api.put('/cliente/update', {
    id: `${id}`,
    nome: nome,
    cpf: cpf,
    logradouro: logradouro,
    numero: numero,
    estado: estado,
    cidade: cidade,
    cep: cep,
  });
    return response;
}

export async function deleteClient(id: number) {
  const response = await api.delete('/cliente/'+id, {});
  return response.data;
}

export async function getUsers() {
  const response = await api.get('/usuarios', {});
  return response.data;
}

export async function getUser(id: string) {
  const response = await api.get('/usuario/'+id, {});
  return response.data;
}

export async function createUser(name: string, email: string, password: string) {
  const response = await api.post('/usuario/create', {
    name: name,
    email: email,
    password: password,
  });
  return response;
}

export async function updateUser(id: string, name: string, email: string, password: string) {
  const response = await api.put('/usuario/update', {
    id: id,
    name: name,
    email: email,
    password: password,
  });
  return response;
}

export async function deleteUser(id: string) {
  const response = await api.delete('/usuario/'+id, {});
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post('/login', {
    email: email,
    password: password,
  });
  if (response){
    return true
  }
}

export const api = axios.create({
  baseURL: urlBase
})


