import moment from 'moment';

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
  }


};

export default formulas;

