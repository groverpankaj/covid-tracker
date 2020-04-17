import React from "react";

const DropDownFields = ({value, onChange}) => {

    return (
      <div>
        <select value={value} onChange={onChange} className="form-control">
          <option value="confirmedcases">Confirmed cases</option>
          <option value="confirmednewcases">Confirmed new cases</option>
          <option value="deaths">Deaths</option>
          <option value="newdeaths">New deaths</option>
        </select>
      </div>
    );
}

export default DropDownFields;
