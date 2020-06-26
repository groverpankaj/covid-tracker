import React from 'react';

import { CubeChildDiv, SpinContainerBody, SpinContainerHead, SpinContainerImageDiv, SpinContainerImage, SpinContainerHeadline, SpinContainerCount, SpinContainerCountry } from '../Styles/SC_CubeSpinner';


const CubeSpinnerFace = ( { record } ) => {

  return(
    
    <CubeChildDiv>

      <SpinContainerHead>
        COVID - 19
      </SpinContainerHead>

      <SpinContainerBody>

        <SpinContainerImageDiv>
          <SpinContainerImage src="../assets/virus.png"></SpinContainerImage>
        </SpinContainerImageDiv>

        <SpinContainerHeadline>
          Confirmed Cases
        </SpinContainerHeadline>

        <SpinContainerCount>
          {(record['confirmedcases']).toLocaleString()}
        </SpinContainerCount> 

        <SpinContainerCountry>
          {record['country']}
        </SpinContainerCountry>
        
      </SpinContainerBody>

    </CubeChildDiv>
  );

}

export default CubeSpinnerFace;