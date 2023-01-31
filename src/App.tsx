import React, { useEffect, useState } from "react";
import "./App.css";
import { IInfoObject, IMakeArrObj, IMakeObject, VehicleObject } from './model/index.tsx';
import MainModule from "./modules/mainModule.tsx";

const App = (): JSX.Element => {
  const [csvArray, setCsvArray] = useState([]);
  const [makeObjectState, setMakeObjectState] = useState<IMakeObject[]>();
  const [vehicleObjectState, setVehicleObjectState] =
    useState<VehicleObject[]>();

  const [uniqueModelItems, setUniqueModelItems] = useState([]);
  const loadData = () => {
    fetch("./data.csv")
      .then((response) => response.text())
      .then((responseText) => {
        processCSV(responseText);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  
  const processCSV = (str: string, delim: string = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const newArray: any[] = rows.map((row) => {
      const values: string[] = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    const cuttedArray = newArray;

    //calculate unique model values
    const data: any = [...new Set(cuttedArray.map((item) => item.Model))];
    setUniqueModelItems(data.length);

    //calculate vehicle class data
    const vehicleClassData: any[] = cuttedArray.map(
      (item) => item.Vehicle_Class
    );
    const uniqueVehicleClassItems: string[] = [
      ...new Set(cuttedArray.map((item) => item.Vehicle_Class)),
    ];
    const totalVehicleClassItems: number = vehicleClassData.length;
    const VehicleObject: VehicleObject[] = [];
    uniqueVehicleClassItems.forEach((currEle: string) => {
      const numItems: string[] = vehicleClassData.filter(
        (ele) => ele === currEle
      );
      VehicleObject.push({
        vehicle: currEle,
        percentage: Number(
          Math.round((numItems.length * 100) / totalVehicleClassItems)
        ),
      });
    });
    //sort data by descending order
    VehicleObject.sort((a, b) => {
      return b.percentage - a.percentage;
    });
    //calculate make other percentage
    console.log("other",VehicleObject)
    const otherVehiclePercentage: number = VehicleObject.slice(3).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.percentage;
      },
      0
    );

    const tempArray: any[] = VehicleObject.slice(0, 2);

    tempArray.push({ vehicle: "Others", percentage: otherVehiclePercentage });
    setVehicleObjectState(tempArray);
    //calculate make data
    const makeArray: any[] = cuttedArray.map((item) => item.Make);
    const uniqueItems: string[] = [
      ...new Set(cuttedArray.map((item) => item.Make)),
    ];
    const totalItems: number = makeArray.length;
    const makeObject: IMakeObject[] = [];
    uniqueItems.forEach((currEle: string) => {
      const numItems: string[] = makeArray.filter((ele) => ele === currEle);
      makeObject.push({
        make: currEle,
        percentage: Number(Math.round((numItems.length * 100) / totalItems)),
      });
    });
    //sort data by descending order
    makeObject.sort((a, b) => {
      return b.percentage - a.percentage;
    });
    //calculate make other percentage
    const otherPercentage: number = makeObject
      .slice(3)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.percentage;
      }, 0);

    const arr: any[] = makeObject.slice(0, 2);

    arr.push({ make: "Others", percentage: otherPercentage });
    setMakeObjectState(arr);
  };

 

  const makeInfoObject: IInfoObject = {
    title: "Make",
    info: "Company of the vehicle",
  };
  const modelInfoObject: IInfoObject = {
    title: "Model",
    info: "Car model",
  };
  const classInfoObject: IInfoObject = {
    title: "Vehicle class",
    info: "Class of vehicle depending on their utility, capacity and weight",
  };
  const makeArrObj: IMakeArrObj[] = [
    {
      property: "Valid",
      items: 6788,
      colorClass: "box bg-green",
      percentage: "100 %",
    },
    {
      property: "Mismatched",
      items: 0,
      colorClass: "box bg-orange",
      percentage: "0 %",
    },
    {
      property: "Missing",
      items: 0,
      colorClass: "box bg-red",
      percentage: "0",
    },
    {
      property: "Unique",
      items: 67,
    },
    {
      property: "Most Common",
      items: "FORD",
      percentage: "9 %",
    },
  ];

  const mainArray = [
    {
      info: makeInfoObject,
      makeObjectState,
      makeArrObj,
    },
    {
      info: modelInfoObject,
      uniqueModelItems,
      makeArrObj,
    },
    {
      info: classInfoObject,
      vehicleObjectState,
      makeArrObj,
    },
  ];
  return (
    <div className="main-div">
      <MainModule mainArray={mainArray} />
    </div>
  );
};

export default App;
