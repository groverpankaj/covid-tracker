import moment from 'moment';
import { ma, dma, ema, sma, wma } from 'moving-averages'


const formulas = {

  getTableData: input => {
    let obj = {};
  
    obj['firstCase'] = moment.utc(input[input.length-1]['reportdate']).format("MMMM DD, YYYY");
  
    let minDeath = Infinity;
    let minDeathPos;
  
    let daysTillZero = 0;
    let daysTillFound = false;
  
    let peakCase = -Infinity;
    let peakDate;
  
    for (let i = 0; i < input.length; i++) {
      if (input[i]['newdeaths'] <= minDeath && input[i]['newdeaths'] !== 0) {
        minDeath = input[i]['newdeaths'];
        minDeathPos = i;
      }
  
      if (input[i]['confirmednewcases'] === 0 && !daysTillFound) {
        daysTillZero++;
      } else {
        daysTillFound = true;
      }
  
      if (input[i]['confirmednewcases'] >= peakCase) {
        peakCase = input[i]['confirmednewcases'];
        peakDate = input[i]['reportdate']
      }
  
    }
  
    obj['daysTillZero'] = daysTillZero;
  
    if (minDeathPos !== undefined) {
      obj['firstDeath'] = moment.utc(input[minDeathPos]['reportdate']).format("MMMM DD, YYYY");
    } else {
      obj['firstDeath'] = ' '; 
    }
  
    obj['peakDate'] = moment.utc(peakDate).format("MMMM DD, YYYY");
    obj['peakCase'] = peakCase.toLocaleString();
  
    return obj;
  },

  sortCountryDesc: ( a, b ) => {
    if ( a.country < b.country ){
      return -1;  
    }
    if ( a.country > b.country ){
      return 1;   
    }
    return 0;
  },

  sortCasesDesc: ( a, b ) => {
    if ( a.confirmednewcases > b.confirmednewcases){
      return -1;  
    }
    if ( a.confirmednewcases < b.confirmednewcases ){
      return 1;   
    }
    return 0;
  },

  sortCases: (input) => {
    let inputCopy = input.slice();
    if (inputCopy.length === 0) {
      return [];
    } else {
      return(inputCopy.sort(formulas.sortCasesDesc).slice(0,9));
    }
  },

  urlToCountryName: input => {
    input = input.toLowerCase();
    // Replace - with space
    input = input.split('-').join(' ');
    // Capitalize each word
    input = input.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
  
    // non capitalized words - of, and, the
    input = input.replace('Of', 'of')
    input = input.replace('And', 'and')
    input = input.replace('The', 'the')
    
    // Edge cases
    if (input === 'Virgin Islands Us') input = "Virgin Islands (U.S.)";
    if (input === 'Virgin Islands British') input = "Virgin Islands (British)";
    if (input === 'International Conveyance Japan') input = "International conveyance (Japan)";
    if (input === 'Guinea Bissau') input = "Guinea-Bissau";
    if (input === 'Timor Leste') input = "Timor-Leste";
  
    return(input);
  },

  countryNameToUrl: input => {
    input = input.split('\.').join('');
    input = input.split('\(').join('');
    input = input.split('\)').join('');
    input = input.split(' ').join('-');
    input = input.toLowerCase();
    return(input);
  },

  movingAverages: (input, averageType, size) => {

    let arr = input.map(element => element[1]);
  
    let movingAverages = [];
  
    switch(averageType) {
      // Simple moving Average
      case "ma":  
        movingAverages = ma(arr, size);
        break;
      // Exponential Moving Average
      case "ema":
        movingAverages = ema(arr, size);
        break;
      default:
        movingAverages = arr;
    }
  
    let result = [];
    
    for (let i = 0; i < input.length; i++) {
      if(movingAverages[i]) {
        let temp = [
          input[i][0],
          Math.round(movingAverages[i])     
        ]
        result.push(temp)
      }
    }
  
    return(result)
  }


};

export default formulas;

