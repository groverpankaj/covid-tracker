import React from 'react';
import moment from 'moment';

const TableCountry = ( {tableData} ) => {

  return(
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Report Date</th>
            <th scope="col" className="text-right">Confirmed <br/>Cases</th>
            <th scope="col" className="text-right">Confirmed <br/>New Cases</th>
            <th scope="col" className="text-right">Deaths</th>
            <th scope="col" className="text-right">New <br/>Deaths</th>
          </tr>
        </thead>
        <tbody>
        {
          tableData.map(record => {
            return(
              <tr key={record.id}>
                <td>{moment.utc(record.reportdate).format("MMMM DD, YYYY")}</td>
                <td className="text-right">{record.confirmedcases.toLocaleString()}</td>
                <td className="text-right">{(record.confirmednewcases !== null ) ? record.confirmednewcases.toLocaleString() : ''}</td>
                <td className="text-right">{(record.deaths !== null) ? record.deaths.toLocaleString() : ''}</td>
                <td className="text-right">{(record.newdeaths!== null) ? record.newdeaths.toLocaleString(): ''}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
}


export default TableCountry;