import React, { Component } from 'react';
import formulas from '../SubComponents/formulas';


const CountryStats = ( {countryDataOne, countryDataTwo} ) => {
  
  if (countryDataOne.length > 0 && countryDataTwo.length > 0) {

    let caseStatOne = formulas.getTableData(countryDataOne);
    let caseStatTwo = formulas.getTableData(countryDataTwo);
    
    return (

      <div className="containerBox">
        <table className="table table-sm bordered">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>{countryDataOne[0].country}</th>
              <th>{countryDataTwo[0].country}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>First Case Reported</th>
              <td>{caseStatOne['firstCase']}</td>
              <td>{caseStatTwo['firstCase']}</td>
            </tr>
            <tr>
              <th>First Death Reported</th>
              <td>{caseStatOne['firstDeath']}</td>
              <td>{caseStatTwo['firstDeath']}</td>
            </tr>
            <tr>
              <th>Peak Daily Cases</th>
              <td>{caseStatOne['peakCase']} <br/>({caseStatOne['peakDate']})</td>
              <td>{caseStatTwo['peakCase']} <br/>({caseStatTwo['peakDate']})</td>
            </tr>
            <tr>
              <th>Days since last reported case</th>
              <td>{caseStatOne['daysTillZero']}</td>
              <td>{caseStatTwo['daysTillZero']}</td>
            </tr>
          </tbody>
        </table>
      </div>

    ); 
  } else {
    return(
      <div>
        &nbsp;
      </div>
    );
  }
}

export default CountryStats;