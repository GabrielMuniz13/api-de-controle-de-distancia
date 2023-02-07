import xlsx from 'xlsx';
import express from 'express';

const file = './planilha/teste.xlsx';

import {autorizadasProximas} from './functions/filtrar.js';
import buscaCep from './functions/consultaCep.js';
import adicionarDistancia from './functions/distancia.js';
import ordenar from './functions/ordenar.js';
const app = express();
const port = 3000;

app.get('/:cep', async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const cep = req.params.cep;
    const wb = xlsx.readFile(file);
    const ws = wb.Sheets["ATT27012023_021413"];
    const data = xlsx.utils.sheet_to_json(ws);
    const dadosCep = await buscaCep(cep);
    //caso cep esteja errado ou nao cadastrado
    if(!dadosCep){
      return res.status(400).send({ error: 'cep invalido' });
    }
    var autorizadas = autorizadasProximas(data, dadosCep.uf);
    autorizadas = await adicionarDistancia(dadosCep,autorizadas);
    const autorizadasOrdem = ordenar(autorizadas);

    const resDados = {
      enderecoConsumidor: dadosCep,
      autorizadas: [autorizadasOrdem[0], autorizadasOrdem[1], autorizadasOrdem[2]]
    }
    res.send(resDados);

  } catch (error) {
    res.status(400).send({ error: 'error' });
  }
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



