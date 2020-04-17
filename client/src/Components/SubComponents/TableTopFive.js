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
                <td>{record.country}</td>
                <td className="text-right">{(record.confirmednewcases).toLocaleString()}</td>
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