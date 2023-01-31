import React from "react"

export const VehicleInfo = (props) => {
    return (
        <div>
            <div className='display-flex'>
                <h2>
                    <span className='underline pr-2'></span>{props.info.title}</h2>
            </div>
            <div className='sub-div'>
                {props.info.info}
            </div>
        </div>
    )
}