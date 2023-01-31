import React from "react";

export const VehicleDetails = (props) => {
  return (
    <div className="first-component-div">
        {/* display make data */}
      {props.makeObjectState?.map((ele) => (
        <div className="sub-item-div">
          <div>{ele.make}</div>
          <div>{ele.percentage}%</div>
        </div>
      ))}
      {/* display unique model items */}
      {props.uniqueModelItems ? (
        <div>
          <h2 className="text-green">
            <b> {props.uniqueModelItems}</b>
          </h2>
          <h4>unique values</h4>
        </div>
      ):null}
      {/* Display vehcile class data */}
       {props.vehicleObjectState?.map((ele) => (
        <div className="sub-item-div">
          <div>{ele.vehicle}</div>
          <div>{ele.percentage}%</div>
        </div>
      ))}
    </div>
  );
};
