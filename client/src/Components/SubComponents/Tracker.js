import React from 'react';

import { Title, Heading, Box, Field, CounterDiv }  from '../Styles/SC_Tracker';
import Counter from './Counter';
 


const Tracker = ( { tableData, seriesName } ) => {
  
  return(

    <div className="containerBox"> 

      <Title>
        COVID-19 PANDEMIC
      </Title>

      <Heading>
        {seriesName}
      </Heading>  

      <Box>
        <Field>Cases</Field>
        <CounterDiv selected="cases">
          {(tableData) ? <Counter start={0} end={tableData.confirmedcases}  delay={0} /> : ''}
        </CounterDiv>
      </Box>

      <Box>
        <Field>Deaths</Field>
        <CounterDiv selected="death">
          {(tableData) ? <Counter start={0} end={tableData.deaths}  delay={0} /> : ''}
        </CounterDiv>
      </Box>

    </div>
  );

}

export default Tracker;