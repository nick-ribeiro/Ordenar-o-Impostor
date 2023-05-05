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

// Pede ao usuário o valor do index (posição) do impostor
const prompt = require('prompt-sync')();
var index = prompt("Digite um valor entre 0 e 2 milhões: ");

// Verifica se o usuário colocou o valor correto entre os parametros estabelecidos
while(index < 0 || index > 2000000) {
  console.log("Valor invalido! Digite novamente");
  var index = prompt("Digite um valor entre 0 e 2 milhões: ");
}

console.log("******* MENU ********");
console.log("* 1 - COUNTING SORT *");
console.log("* 2 - RADIX SORT    *");
console.log("*********************");
var escolha = prompt("Digite sua escolha: ");

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
  Função de Ordernar o vetor do Impostor usando Counting Sort
  Além disso, também cria-se um contador a partir da função
*/
console.time('Timer');
function CountingSort(Arr) {
  const n = Arr.length;

  // Encontrar o maior valor do log no array
  let maxLog = Arr[0]['log'];

  for (let i = 1; i < n; i++) {

    if (Arr[i]['log'] > maxLog) {
      maxLog = Arr[i]['log'];
    }
  }

  // Criar um array auxiliar para contar a frequência dos valores únicos do log
  const freq = new Array(maxLog + 1).fill(0);

  for (let i = 0; i < n; i++) {

    freq[Arr[i]['log']]++;
  }

  // Atualizar o array auxiliar para contar a posição dos valores no array ordenado
  for (let i = 1; i <= maxLog; i++) {

    freq[i] += freq[i - 1];
  }

  // Criar um novo array ordenado baseado na contagem dos valores únicos do log
  const ArrayOrdenado = new Array(n);

  for (let i = n - 1; i >= 0; i--) {

    ArrayOrdenado[freq[Arr[i]['log']] - 1] = Arr[i];
    freq[Arr[i]['log']]--;
  }

  return ArrayOrdenado;
}

/*
  Função de Ordernar o vetor do Impostor usando Radix Sort
  Além disso, também cria-se um contador a partir da função
*/
console.time('Timer2');
function RadixSort(Arr) {
  const n = Arr.length;

  // Encontrar o maior valor do log no array
  let maxLog = Arr[0]['log'];

  for (let i = 1; i < n; i++) {

    if (Arr[i]['log'] > maxLog) {
      maxLog = Arr[i]['log'];
    }
  }

  // Aplicar o algoritmo Radix Sort em cada dígito do valor do log, do menos significativo para o mais significativo
  for (let s = 1; maxLog/s >= 1; s *= 10) {

    // Criar um array auxiliar para armazenar temporariamente os objetos baseados no valor do dígito atual
    const ArrayTemp = new Array(n);

    // Criar um array auxiliar para contar a frequência dos valores do dígito atual
    const freq = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {

      const digito = Math.floor((Arr[i]['log'] / s) % 10);
      freq[digito]++;
    }

    // Atualizar o array auxiliar para contar a posição dos objetos no array ordenado
    for (let i = 1; i < 10; i++) {

      freq[i] += freq[i - 1];
    }

    // Preencher o array temporário com os objetos ordenados baseados no valor do dígito atual
    for (let i = n - 1; i >= 0; i--) {

      const digito = Math.floor((Arr[i]['log'] / s) % 10);
      ArrayTemp[freq[digito] - 1] = Arr[i];
      freq[digito]--;
    }

    // Atualizar o array original com os objetos ordenados baseados no valor do dígito atual
    for (let i = 0; i < n; i++) {

      Arr[i] = ArrayTemp[i];
    }
  }

  return Arr;
}

// Finaliza o processo ao terminar a leitura
jsonStream.on('end', () => {
    console.log('Leitura do arquivo concluída.');
    
    // Criação de um vetor vazio para receber a concatenação dos outros vetores criados
    var meses = [];

    // Chama a função de inserir os dados nos vetores correspondentes
    InsertionVector();

    // Confere se o usuário colocou a primeira escolha, assim referindo-se a opção de ordernar com Counting Sort
    if(escolha == 1) {
      if(January.length != 0) { 
        const ArrayOrdenado = CountingSort(January);
        meses = meses.concat(ArrayOrdenado);
      }

      if(February.length != 0) { 
          const ArrayOrdenado = CountingSort(February);
          meses = meses.concat(ArrayOrdenado);
      }

      if(March.length != 0) { 
          const ArrayOrdenado = CountingSort(March);
          meses = meses.concat(ArrayOrdenado);
      }

      if(April.length != 0) { 
          const ArrayOrdenado = CountingSort(April);
          meses = meses.concat(ArrayOrdenado);
      }

      if(May.length != 0) { 
          const ArrayOrdenado = CountingSort(May);
          meses = meses.concat(ArrayOrdenado);
      }

      if(June.length != 0) { 
          const ArrayOrdenado = CountingSort(June);
          meses = meses.concat(ArrayOrdenado);
      }

      if(July.length != 0) { 
          const ArrayOrdenado = CountingSort(July);
          meses = meses.concat(ArrayOrdenado);
      }

      if(August.length != 0) { 
          const ArrayOrdenado = CountingSort(August);
          meses = meses.concat(ArrayOrdenado);
      }

      if(September.length != 0) { 
          const ArrayOrdenado = CountingSort(September);
          meses = meses.concat(ArrayOrdenado);
      }

      if(October.length != 0) { 
          const ArrayOrdenado = CountingSort(October);
          meses = meses.concat(ArrayOrdenado);
      }

      if(November.length != 0) { 
          const ArrayOrdenado = CountingSort(November);
          meses = meses.concat(ArrayOrdenado);
      }

      if(December.length != 0) { 
          const ArrayOrdenado = CountingSort(December);
          meses = meses.concat(ArrayOrdenado);
      }

      // Mostra o impostor
      console.log("Possivel impostor: " + meses[index].user);
      console.log("Log: " + meses[index].log);
      console.log("Msg: " + meses[index].msg);
      console.log("Month: " + meses[index].month);

      // Fim do Timer
      console.timeEnd('Timer');
    }
    
    // Confere se o usuário colocou a segunda escolha, assim referindo-se a opção de ordernar com Radix Sort
    else if (escolha == 2) {
      if(January.length != 0) { 
        const ArrayOrdenado = RadixSort(January);
        meses = meses.concat(ArrayOrdenado);
      }

      if(February.length != 0) { 
          const ArrayOrdenado = RadixSort(February);
          meses = meses.concat(ArrayOrdenado);
      }

      if(March.length != 0) { 
          const ArrayOrdenado = RadixSort(March);
          meses = meses.concat(ArrayOrdenado);
      }

      if(April.length != 0) { 
          const ArrayOrdenado = RadixSort(April);
          meses = meses.concat(ArrayOrdenado);
      }

      if(May.length != 0) { 
          const ArrayOrdenado = RadixSort(May);
          meses = meses.concat(ArrayOrdenado);
      }

      if(June.length != 0) { 
          const ArrayOrdenado = RadixSort(June);
          meses = meses.concat(ArrayOrdenado);
      }

      if(July.length != 0) { 
          const ArrayOrdenado = RadixSort(July);
          meses = meses.concat(ArrayOrdenado);
      }

      if(August.length != 0) { 
          const ArrayOrdenado = RadixSort(August);
          meses = meses.concat(ArrayOrdenado);
      }

      if(September.length != 0) { 
          const ArrayOrdenado = RadixSort(September);
          meses = meses.concat(ArrayOrdenado);
      }

      if(October.length != 0) { 
          const ArrayOrdenado = RadixSort(October);
          meses = meses.concat(ArrayOrdenado);
      }

      if(November.length != 0) { 
          const ArrayOrdenado = RadixSort(November);
          meses = meses.concat(ArrayOrdenado);
      }

      if(December.length != 0) { 
          const ArrayOrdenado = RadixSort(December);
          meses = meses.concat(ArrayOrdenado);
      }

      // Mostra o impostor
      console.log("Possivel impostor: " + meses[index].user);
      console.log("Log: " + meses[index].log);
      console.log("Msg: " + meses[index].msg);
      console.log("Month: " + meses[index].month);

      // Fim do Timer
      console.timeEnd('Timer2');
    }

    // Se o usuário coloca um valor que não se 1 ou 2, desse modo mostra que a opção não foi localizada
    else {
      console.log("Opção não encontrada");
    }
});
