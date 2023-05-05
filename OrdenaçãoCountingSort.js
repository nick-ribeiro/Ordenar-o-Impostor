const fs = require('fs');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
var inputData = [];

let MesesMap = new Map();

MesesMap.set('January', 1);
MesesMap.set('February', 2);
MesesMap.set('March', 3);
MesesMap.set('April', 4);
MesesMap.set('May', 5);
MesesMap.set('June', 6);
MesesMap.set('July', 7);
MesesMap.set('August', 8);
MesesMap.set('September', 9);
MesesMap.set('October', 10);
MesesMap.set('November', 11);
MesesMap.set('December', 12);

// Criação de 12 arrays vazios que irão receber os dados de referentes ao mês
var January = [];
var February = [];
var March = [];
var April = [];
var May = [];
var June = [];
var July = [];
var August = [];    
var September = [];
var October = [];
var November = [];
var December = [];

// Variável tam é a variável que irá verificar em que mês está contido o impostor
var tam = 0;

// Variável index, seria uma variável fixa em que seria o index do impostor
var index = 1000001;

// Função para processar cada objeto JSON lido do arquivo, colocando-o em um vetor
async function processJsonObject(jsonObj) {
  inputData.push(jsonObj);
}

// Caminho do arquivo JSON de origem
const filePath = './data.json';

// Cria um fluxo de leitura para o arquivo
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

// Cria um pipeline de fluxo com StreamArray
const jsonStream = readStream.pipe(parser()).pipe(streamArray());

// Lê e processa cada objeto JSON do array
jsonStream.on('data', ({ key, value }) => {
  processJsonObject(value);
});

// Captura erros no fluxo de leitura
readStream.on('error', (error) => {
  console.error(`Erro ao ler o arquivo: ${error.message}`);
});

// Captura erros no fluxo JSON
jsonStream.on('error', (error) => {
  console.error(`Erro ao analisar o JSON: ${error.message}`);
});

/* Função para ordenar os vetores de acordo com o mês.
  Ex: Month January -> passa todos os dados para o vetor de Janeiro
*/
function InsertionVector(){
  inputData.forEach(e => {
        switch(MesesMap.get(e.month)) {
          
          case 1:
            January.push(e);
            break;
          case 2:
            February.push(e);
            break;
          case 3:
            March.push(e);
            break;
          case 4:
            April.push(e);
            break;
          case 5:
            May.push(e);
            break;
          case 6:
            June.push(e);
            break;
          case 7:
            July.push(e);
            break;
          case 8:
            August.push(e);
            break;
          case 9:
            September.push(e);
            break;
          case 10:
            October.push(e);
            break;
          case 11:
            November.push(e);
            break;
          case 12:
            December.push(e);
            break;
          default:
        }
  });
}

/*
  Função de Ordernar o vetor do Impostor usando counting Sort
*/
console.time('Timer');

function Ordenacao(June) {
  const n = June.length;

  // Encontrar o maior valor do log no array
  let maxLog = June[0]['log'];

  for (let i = 1; i < n; i++) {

    if (June[i]['log'] > maxLog) {
      maxLog = June[i]['log'];
    }
  }

  // Criar um array auxiliar para contar a frequência dos valores únicos do log
  const freq = new Array(maxLog + 1).fill(0);

  for (let i = 0; i < n; i++) {

    freq[June[i]['log']]++;
  }

  // Atualizar o array auxiliar para contar a posição dos valores no array ordenado
  for (let i = 1; i <= maxLog; i++) {

    freq[i] += freq[i - 1];
  }

  // Criar um novo array ordenado baseado na contagem dos valores únicos do log
  const ArrayOrdenado = new Array(n);

  for (let i = n - 1; i >= 0; i--) {

    ArrayOrdenado[freq[June[i]['log']] - 1] = June[i];
    freq[June[i]['log']]--;
  }

  return ArrayOrdenado;
}

// Finaliza o processo ao terminar a leitura
jsonStream.on('end', () => {
    console.log('Leitura do arquivo concluída.');
    var meses = [];

    InsertionVector();
    
    if(January.length > index) {
      console.log("O impostor está contido nesse mês");
    }
    else {
      console.log("O impostor não está nesse mês");
      tam = January.length;
      if(January.length != 0) { 
        meses = meses.concat(January);
      }
    }
    
    if((tam + February.length) > index) {
      console.log("O impostor está aqui");
    }
    else {
      console.log("O impostor não está nesse mês");
      tam = tam + February.length;
      if(February.length != 0) { 
        meses = meses.concat(February);
      }
    }

    if((tam + March.length) > index) {
      console.log("O impostor está aqui");
    }
    else {
      console.log("O impostor não está nesse mês");
      tam = tam + March.length;
      if(March.length != 0) { 
        meses = meses.concat(March);
      }
    }

    if((tam + April.length) > index) {
      console.log("O impostor está aqui");
    }
    else {
      console.log("O impostor não está nesse mês");
      tam = tam + April.length;
      if(April.length != 0) { 
        meses = meses.concat(April);
      }
    }

    if((tam + May.length) > index) {
      console.log("O impostor está aqui");
    }
    else {
      console.log("O impostor não está nesse mês");
      tam = tam + May.length;
      if(May.length != 0) { 
        meses = meses.concat(May);
      }
    }

    if((tam + June.length) > index) {
      console.log("O impostor está aqui");
      tam = tam + June.length;
      const ArrayOrdenado = Ordenacao(June);
      meses = meses.concat(ArrayOrdenado);
      
    }
    else {
      console.log("O impostor não está nesse mês");
      tam = tam + June.length;
    }

    if(July.length != 0) { 
      tam = tam + July.length;
      meses = meses.concat(July);
    }

    if(August.length != 0) { 
      tam = tam + August.length;
      meses = meses.concat(August);
    }

    if(September.length != 0) { 
      tam = tam + September.length;
      meses = meses.concat(September);
    }

    if(October.length != 0) { 
      tam = tam + October.length;
      meses = meses.concat(October);
    }

    if(November.length != 0) { 
      tam = tam + November.length;
      meses = meses.concat(November);
    }

    if(December.length != 0) { 
      tam = tam + December.length;
      meses = meses.concat(December);
    }

    // Mostra o possível impostor no index 1000001
    console.log("Possivel impostor: " + meses[index].user);
    console.log("Log: " + meses[index].log);
    console.log("Msg: " + meses[index].msg);
    console.log("Month: " + meses[index].month);

    console.timeEnd('Timer')
});
