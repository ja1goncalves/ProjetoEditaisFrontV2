import axios from "axios";

export const urlBase = "http://localhost:8081/upe/"

/*export async function downloadAndCachePDF(id: number) {
  const pdfUrl = `${urlBase}edital/${id}/pdf`;
  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer"
  });

  const filePath = path.resolve(__dirname, `edital_${id}.pdf`);
  fs.writeFileSync(filePath, response.data);

  return filePath;
}

export async function uploadPDF(filePath: any, id: number) {
  const formData = new FormData();
  formData.append('edital_pdf', fs.createReadStream(filePath), {
    filename: `edital_${id}.pdf`
  });

  const response = await axios.post(`${urlBase}edital/inserir/${id}/pdf`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
}
*/

export async function getEditais() {
  const response = await api.get('editais', {});
  return response.data;
}

export async function getUsers() {
  const response = await api.get('usuario', {});
  return response.data;
}

export async function getUser(id: string) {
  const response = await api.get('usuario/'+id, {});
  return response.data;
}

export async function getUserLogin(login: string) {
  const response = await api.get('usuario/login/'+login, {});
  console.log('oiee')
  return response.data;
}

export async function createUser(nome: string, login: string, senha: string, idPerfil: number) {
  const response = await api.post('usuario', {
    nome: nome,
    login: login,
    senha: senha,
    idPerfil: idPerfil
  });
  return response;
}

export async function updateUser(id: string, name: string, email: string, password: string) {
  const response = await api.put('usuario/update', {
    id: id,
    name: name,
    email: email,
    password: password,
  });
  return response;
}

export async function deleteUser(id: number) {
  const response = await api.delete('usuario/'+id, {});
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

export async function getEditaisId(id: string) {
  const response = await api.get('edital/usuario/'+id, {});
  return response.data;
}

export async function updateEditais(id: number, nome: string, categoria: string, publicoAlvo: string, area: string, dataPublicacao: string, dataInicial: string, dataFinal: string, resultado: string, idUsuario: number, idOrgaoFomento: number, criadoPorBot: boolean
) {
  
  try {
    console.log('oiee')
    console.log(id, nome, categoria, publicoAlvo, area, dataPublicacao, dataInicial, dataFinal, resultado, idUsuario, idOrgaoFomento, criadoPorBot)
    const response = await api.put(`edital`, {
      id: id,
      nome: nome,
      categoria: categoria,
      publicoAlvo: publicoAlvo,
      area: area,
      dataPublicacao: dataPublicacao,
      dataInicial: dataInicial,
      dataFinal: dataFinal,
      resultado: resultado,
      idUsuario: idUsuario,
      idOrgaoFomento: idOrgaoFomento,
      criadoPorBot: criadoPorBot
    })
    return response.data;
  } catch (error) {
    console.error('Error updating program:', error);
    throw error;
  }
}

export async function removerEdital(id: number) {
  const response = await api.delete('edital/'+id, {});
  return response.data;
}

export const api = axios.create({
  baseURL: urlBase
})


