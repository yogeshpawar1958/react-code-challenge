import React from "react"
import { AnalysisModule } from "./analysis-module.tsx"
import { VehicleInfo } from "./VehiceInfo.tsx"
import { VehicleDetails } from "./VehicleDetails.tsx"

const MainModule =(props)=>{
    return(
        props.mainArray.map((ele,index)=>(
            <div className='first-div' key={index}>
            <VehicleInfo info={ele.info} />
            <div className='main-component-div'>
              <VehicleDetails  makeObjectState={ele.makeObjectState} vehicleObjectState={ele.vehicleObjectState} uniqueModelItems={ele.uniqueModelItems} />
              <AnalysisModule  makeArrObj={ele.makeArrObj} />
            </div>
          </div>
        ))
       
    )
}
export default MainModule