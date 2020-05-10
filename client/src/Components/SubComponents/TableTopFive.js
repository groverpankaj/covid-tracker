import React from 'react';
import Style from '../Styles/TableTopFive.module.css';

const TableTopFive = ({ tableData }) => {


  return (
    <div className={Style.Container}>
      <table className="table table-bordered">
        <thead>
          <tr className={Style.HeadRow}>
            <th colSpan="2" className="text-center">HOTSPOTS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">&nbsp;<br />Countries</th>
            <th scope="col" className="text-right">Confirmed <br />New Cases</th>
          </tr>

          {tableData.map((record, index) => {
            return (
              <tr key={record.country + index} className={Style.RecordText}>
                
                <td><span className={Style.Flag}><img src={"https://www.countryflags.io/" + record.alphatwocode +  "/shiny/32.png"}></img></span><span className="align-middle">{record.country}</span></td>
                <td className="text-right align-middle">{(record.confirmednewcases).toLocaleString()}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default TableTopFive;