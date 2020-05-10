import React from 'react';

const CountriesListDropdown = ( {name, countriesList, changeHandle, firstSelected} ) => {
  
  return(
    <div className="containerBox">
      <select className="form-control" onChange={changeHandle} value={firstSelected} name={name} style={{fontSize: "1.1em", color: "#002e6d"}}>
        {
          countriesList.map( country => {
            return(
              <option 
                key={country.country} 
                value={country.country}
                field="confirmedcases"
              >
                {country.country}
              </option>)
          })
        }
      </select>
    </div>
  );

}

export default CountriesListDropdown;