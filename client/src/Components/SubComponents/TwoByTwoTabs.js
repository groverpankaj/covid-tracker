import React from 'react';
import Style from '../Styles/TwoByTwoTabs.module.css';

const TwoByTwoTabs = ({ tabArray, selectedTab, click }) => {

  return (
    <div className={Style.Tabcontainer}>
      {tabArray.map(element => {
        return (
          <div key={element.name}>
            <button
              name={element.name}
              className={(element.name === selectedTab ? Style.TabLinksSelected : Style.TabLinks)}
              onClick={click}
            >
              {element.value}
            </button>
          </div>
        );
      })}

    </div>
  );

}

export default TwoByTwoTabs;