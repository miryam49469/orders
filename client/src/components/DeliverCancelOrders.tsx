import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { BASE_URL } from "../config/config";



export const options = {
  title: " Deliver/Cancel Orders",
  curveType: "function",
  legend: { position: "bottom" },
  backgroundColor:"lightGray",

};
export function DeliverCancelOrders () {
const [orders, setOrders] = useState<any>([]);

 const graghRequest = async () => {
    await axios.get(`http://localhost:8080/Graph/statusOrder?monthAmount=3`).then(res => setOrders(res.data));

  }

  useEffect(() => {
    graghRequest()

  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);

   const data = [
  ["Month", "order done", "order fale"],
  ["01/23", 100, 40],
  ["02/23", 117, 46],
  ["03/23", 66, 112],
 
];
const transformDataForChart= () => {
  const months = Object.keys(orders);
  const chartData = [["Month", "order done", "order fail"]];

  months.forEach((month) => {
    const orderData = orders[month];
    const orderFail:any=parseInt(Object.keys(orderData)[0])|| 0
    const orderDone:any =Object.values(orderData)[0] || 0;
    chartData.push([month, orderDone, orderFail]);
  });

  return chartData;
};
    return (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={transformDataForChart()}
          options={options}
        />
      );
    }