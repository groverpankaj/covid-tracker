import React from 'react';
import { Tabcontainer, TabcontainerChildDiv, TabLinks } from '../Styles/SC_GraphTabs'


const GraphTabs = ({ tabArray, selectedTab, clickHandle, smallOrNot }) => {
 
  return (
    <div className="containerBox">
      <Tabcontainer>
        {tabArray.map(element => {
          return (
            <TabcontainerChildDiv key={element.name} small={smallOrNot}>
              <TabLinks
                name={element.name}
                selected={(element.name === selectedTab)}
                onClick={clickHandle}
              >
                {element.value}
              </TabLinks>
            </TabcontainerChildDiv>
          );
        })}

      </Tabcontainer>
    </div>
  );

}

export default GraphTabs;