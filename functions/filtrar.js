//Estados proximo um do outro
const estProximo = [
    ['AM', 'AC', 'RR', 'RO'],
    ['AC', 'AM', 'RO'],
    ['RO', 'AC', 'AM', 'MT'],
    ['MT', 'RO', 'MS', 'GO', 'TO', 'PA'],
    ['MS', 'MT', 'GO', 'MG', 'SP', 'PR'],
    ['PR', 'SP', 'SC', 'MS'],
    ['SC', 'PR', 'SP', 'RS'],
    ['RS', 'SC', 'PR'],
    ['SP', 'PR', 'MS', 'MS', 'RJ', 'SC'],
    ['MG', 'RJ', 'ES', 'SP', 'GO', 'BA'],
    ['RJ', 'SP', 'MG', 'ES'],
    ['ES', 'RJ', 'MG', 'BA'],
    ['BA', 'ES', 'MG', 'GO', 'TO', 'PI', 'MA', 'PE', 'AL', 'SE'],
    ['SE', 'BA', 'AL', 'PE'],
    ['AL', 'SE', 'PE', 'BA'],
    ['PE', 'PB', 'CE', 'PI', 'AL', 'SE'],
    ['PB', 'RN', 'CE', 'PE'],
    ['RN', 'CE', 'PB'],
    ['CE', 'RN', 'PB'],
    ['PI', 'CE', 'PE', 'BA', 'TO', 'MA'],
    ['MA', 'PI', 'CE', 'TO', 'BA', 'PA'],
    ['PA'],
    ['AP'],
    ['RR'],
    ['TO'],
    ['GO'],
]
//recebe estado atual e pega os estados proximos
function filtrarEstados(estado){
    for(let i=0; i<estProximo.length;i++){
        if(estProximo[i][0]==estado){
            return estProximo[i];
        }
    }
}
//Recebo todas autorizadas e filtro as mais proximo do meu estados. Estado em que estou localizado
export function autorizadasProximas(autorizadas, estado){
    var possuiEmpresasProxima = false;
    var autorizadasProximas = [];
    const estados = filtrarEstados(estado);
    for(let i=0; i<autorizadas.length;i++){
        for(let j=0; j<estados.length;j++){
            if(autorizadas[i].Estado==estados[j]){
                possuiEmpresasProxima=true
                autorizadasProximas.push(autorizadas[i]);
            }
        }
    }
    //caso nao tenha autorizadas nos estados proximo retornas todas as autorizadas
    if(possuiEmpresasProxima){
        return autorizadasProximas;
    }else{
        return autorizadas;
    }
}