import axios from "axios";

export default async function buscaCep(cep) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return(response.data);
    } catch (error) {
      return false;
    }
}