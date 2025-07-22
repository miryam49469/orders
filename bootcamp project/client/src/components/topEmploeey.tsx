import { generateKey } from "crypto";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import blue from '@mui/material/colors/blue';
import { redirect } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";


export const data = [
  ["emploeey", "orders"],
  ["Michal", 11],
  ["Oren", 2],
  ["Helena", 2],
  ["Dave", 2],
  ["Eli", 7],
];
export const options = {
  backgroundColor:"lightGray",
  title: "Top Employee",


  };
export default function TopEmploeey() {
const [topEmploeey, settopEmploeey] = useState<any[]>([]);
const graghRequest = async () => {
  await axios.get(`http://localhost:8080/Graph/topEmploeey`).then(res => settopEmploeey(res.data));

}

useEffect(() => {
  graghRequest()

}, []);
useEffect(() => {
  console.log(topEmploeey);
}, [topEmploeey]);


const transformDataForChart= () => {
  const chartData:any = [ ["emploeey", "orders"]];;

  topEmploeey.forEach((order) => {
    if(order.employee.fullName!=null && order.countOfDeliveredOrders!=null)
   { const emploeey:any=order.employee.fullName
    const orders:any =order.countOfDeliveredOrders
    chartData.push([emploeey, orders]);}
  });

  return chartData;
};
 return (
    <Chart  
      chartType="PieChart"
      data={transformDataForChart()}
      options={options}
      width={"100%"}
      height={"400px"}
      />
  );
}