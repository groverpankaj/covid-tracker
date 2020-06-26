import React from 'react';
import { RadioContainer, RadioDiv } from '../Styles/SC_AverageRatioBtn';

const AverageRadioBtn = ( {selected, clickHandle} ) => {
  return(
    <div>
      <RadioContainer>
        <RadioDiv>
          <input type="radio" className="form-check-inline" name="averageType" value="ema" onChange={clickHandle} checked={selected === "ema"}></input>10 Day Exponential Moving Average
        </RadioDiv>
        <RadioDiv>
          <input type="radio" className="form-check-inline" name="averageType" value="daily" onChange={clickHandle} checked={selected === "daily"}></input>Daily
        </RadioDiv>     
        <RadioDiv>
          <input type="radio" className="form-check-inline" name="averageType" value="ma" onChange={clickHandle} checked={selected === "ma"}></input>10 Day Simple Moving Average  
        </RadioDiv>
      </RadioContainer> 
    </div>
  );
}

export default AverageRadioBtn;