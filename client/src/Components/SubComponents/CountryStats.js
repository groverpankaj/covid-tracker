import React, { Component } from 'react';
import formulas from '../SubComponents/formulas';


const CountryStats = ( {countryData} ) => {
  // console.log(countryData)
  if (countryData.length > 0) {

    let caseStat = formulas.getTableData(countryData);

    return (

      <div className="containerBox">
        <table className="table table-sm bordered">
          <tbody>
            <tr>
              <th>First Case Reported</th>
              <td>{caseStat['firstCase']}</td>
            </tr>
            <tr>
              <th>First Death Reported</th>
              <td>{caseStat['firstDeath']}</td>
            </tr>
            <tr>
              <th>Peak Daily Cases</th>
              <td>{caseStat['peakCase']} <br/>({caseStat['peakDate']})</td>
            </tr>
            <tr>
              <th>Days since last reported case</th>
              <td>{caseStat['daysTillZero']}</td>
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