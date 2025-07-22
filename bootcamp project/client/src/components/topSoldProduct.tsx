import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { BASE_URL } from "../config/config";
import swal from "sweetalert";

interface Product {
  productName: string;
  amount: number;
}

interface TopProduct {
  month: string;
  products: Product[];
}
export function TopSoldProduct() {
  const [topProduct, setTopProduct] = useState<TopProduct[]>([]);



  const graghRequest = async () => {
    await axios.get(`http://localhost:8080/Graph/topProduct`).then(res => setTopProduct(res.data));

  }

  useEffect(() => {
    graghRequest()

  }, []);
  useEffect(() => {
    console.log(topProduct);
  }, [topProduct]);



  const productsName: string[] = ["Month"];

  topProduct.map((item) => {
    item.products.forEach((product) => {
      const foundProduct = productsName.find((productName) => productName === product.productName);
      if(foundProduct==undefined)
       productsName.push(product.productName);

    });
  });
  const chartData = topProduct.map((item) => {
    const dataRow: any[] = [item.month];
    const productMap: { [name: string]: number } = {};
     item.products.forEach((product) => {
      productMap[product.productName] = product.amount;
    });

    productsName.forEach((productName) => {
      if (productName != "Month") {
        const amount = productMap[productName] || 0;
        dataRow.push(amount);
      }
    });

    return dataRow;
  });



  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}

      data={[

        productsName,
        ...chartData,

      ]}
      options={{
        title: "Top Sold Products",
        chartArea: { width: "50%" },
        isStacked: true,
        vAxis: {
          title: "",
          gridlines: { color: "none" },
          textPosition: "none"
          
        },
        bars: "vertical",
        backgroundColor: "lightgray",
      }}

    />

  );
}



