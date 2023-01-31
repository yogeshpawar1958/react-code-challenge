import React from "react"

export const AnalysisModule = (props) => {
    return (
        <div className='second-component-div'>
            <div className='border-line'></div>
            <div>
                {props.makeArrObj.map((ele) => (
                    <div className='d-flex-space-between p-1'>
                        <div className='display-flex'>
                            <span className='mr-1'>{ele.property}</span><div className={`${ele.colorClass && ele.colorClass}`}></div>
                        </div>
                        <div className='right-sub-div'>
                            <div className='right-div'>{ele.items}</div>
                            <div className='right-div'>{ele.percentage}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}