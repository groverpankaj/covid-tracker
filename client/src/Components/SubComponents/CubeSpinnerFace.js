import React from 'react';
import Style from '../Styles/CubeSpinner.module.css';

const CubeSpinnerFace = ( { record } ) => {

  return(
    
    <div className={Style.SpinContainer}>

      <div className={Style.SpinContainerHead}>COVID - 19</div>

      <div className={Style.SpinContainerBody}>

        <div className={Style.SpinContainerImageDiv}>
          <img src="../assets/virus.png"></img>
        </div>

        <div className={Style.SpinContainerHeadline}>
          Confirmed Cases
        </div>

        <div className={Style.SpinContainerCount}>
          {(record['confirmedcases']).toLocaleString()}
        </div> 

        <div className={Style.SpinContainerCountry}>
          {record['country']}
        </div>
        
      </div>

    </div>
  );

}

export default CubeSpinnerFace;