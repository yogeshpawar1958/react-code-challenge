
 interface IMakeObject {
    make: string;
    percentage: number;
  }
   interface VehicleObject {
    vehicle: string;
    percentage: number;
  }
  interface IMakeArrObj {
    property: string;
    items: number | string;
    colorClass?: string;
    percentage?: string;
  }
  
   interface IInfoObject {
    title: string;
    info: string;
  }
  export { IMakeObject, VehicleObject, IMakeArrObj, IInfoObject };
