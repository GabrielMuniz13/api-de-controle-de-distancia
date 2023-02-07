export default function ordenar(autorizadas){
    autorizadas.sort(compare);
    return autorizadas;
};

function compare(a,b) {
  if (a.distanciaKm.value < b.distanciaKm.value)
     return -1;
  if (a.distanciaKm.value > b.distanciaKm.value)
    return 1;
  return 0;
}

