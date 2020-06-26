import React from 'react';
import {Container, HeadRow, RecordText, Flag } from '../Styles/SC_TableTopFive';


const TableTopFive = ({ tableData, clickHandle }) => {

  return (
    <div className="containerBox">
      <table className="table table-bordered">
        <thead>
          <HeadRow>
            <th colSpan="2" className="text-center">HOTSPOTS</th>
          </HeadRow>
        </thead>
        <tbody>
          <tr>
            <th scope="col">Countries</th>
            <th scope="col" className="text-right">Daily Cases</th>
          </tr>

          {tableData.map((record, index) => {
            return (
              <RecordText key={record.country + index} onClick={() => clickHandle(record.country)}>
                <td>
                  <Flag>
                    <img src={"https://www.countryflags.io/" + record.alphatwocode +  "/shiny/32.png"}>
                    </img>
                  </Flag>
                  <span className="align-middle">
                    {record.country}
                  </span>
                </td>
                <td className="text-right align-middle">
                  {(record.confirmednewcases).toLocaleString()}
                </td>
              </RecordText>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default TableTopFive;