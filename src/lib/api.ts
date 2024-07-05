import axios from "axios";

const urlBase = "http://localhost:8081/upe/"

export async function getEditais() {
  const response = await api.get('/editais', {});
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

export async function loginUser(login: string, senha: string) {
  const response = await api.post('usuario/login', {
    login: login,
    senha: senha,
  });
  if (response){
    return response
  }
}

export const api = axios.create({
  baseURL: urlBase
})


