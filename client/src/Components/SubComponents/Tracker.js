import React from 'react';

import Style from '../Styles/Tracker.module.css';
import Counter from './Counter';



const Tracker = ( { tableData, seriesName } ) => {
  
  return(

    <div className={Style.Container}> 

      <div className={Style.Title}>
        COVID-19 PANDEMIC
      </div>

      <div className={Style.Heading}>
        {seriesName}
      </div>  

      <div className={Style.Box}>
        <div className={Style.Field}>Cases</div>
        <div className={[Style.CasesCounter, Style.Counter].join(" ")}>{(tableData) ? <Counter start={0} end={tableData.confirmedcases}  delay={0} /> : ''}</div>
      </div>

      <div className={Style.Box}>
        <div className={Style.Field}>Deaths</div>
        <div className={[Style.DeathCounter, Style.Counter].join(" ")}>{(tableData) ? <Counter start={0} end={tableData.deaths}  delay={0} /> : ''}</div>
      </div>

    </div>
  );

}

export default Tracker;