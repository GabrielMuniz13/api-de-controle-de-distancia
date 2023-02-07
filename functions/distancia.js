
import axios from 'axios';
async function consultarDistancematrix(origin, destination) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyBGtYfi5GmerHb2GLxvKZX5JvssLgSm360`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function adicionarDistancia(endereco, autorizadas){
  // dados -> dados da requisacao da api matreix distance
  var dados = [];
  const origin = endereco.bairro+' '+endereco.localidade+' '+endereco.uf;
  const destinations = stringDestination(autorizadas);
  //roda os array de destinos.
  for (let i = 0; i < destinations.length; i++) {
    const data = await consultarDistancematrix(origin, destinations[i]);
    dados.push(data);
  }
  //adicionar as distance nas autorizadas

  autorizadas = adicionarDistanciaAutorizadas(autorizadas, dados)
  return autorizadas;
  

}

function adicionarDistanciaAutorizadas(autorizadas, dados){
  const distances = unificarArray(dados);
  const autorizadasKm = autorizadas.map((autorizada, index) => {
    autorizada.distanciaKm = distances[index];
    return autorizada;
  });
  
  return autorizadasKm;
}

function stringDestination(autorizadas){
  var destinations = [];
  const qtdAutorizadas = autorizadas.length;
  const control = Math.ceil(qtdAutorizadas/25);

  var j = 0;
  var i = 0;
  while(j<control){
    if(i<qtdAutorizadas) {
      const stringText = autorizadas[i].Bairro+' '+autorizadas[i].Cidade+' '+autorizadas[i].Estado+'|'
      if(!destinations[j]){
        destinations[j] = stringText;
      }else{
        destinations[j] = destinations[j]+stringText;  
      }          
      i++;
      if(i % 25 == 0 || qtdAutorizadas==i){
        j++;
      }
    }
  }
  return destinations;
}

//agrupar dados em o unico array.
function unificarArray(dados){
  var uniDados = [];
  dados.map((dado)=>{
    dado.rows[0].elements.map((values)=>{
      if(!values.distance){
        uniDados.push(
          {
            value: 99999999,
            text: '99999999',
            error: 'Rota nao encontrada !!!!'
          }
        )
      }else{
        uniDados.push(values.distance)
      }
    });
  });
  return uniDados;
}