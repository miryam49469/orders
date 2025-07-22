import axios from "axios";
import { IOrder } from "../types/Iorder";
import { log } from "console";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UseCrud = () => {
    const getData = async (url:string) => { 
      try {
        console.log(`${BASE_URL}/${url}`);
        const response = await axios.get(`${BASE_URL}/${url}`);
        var x=response.data;
        return await x;
      } catch (error) {
        return error;
  
      }}
      const postData = async (url:string,body:Object) => { try {        
        const response = await axios.post(`${BASE_URL}/${url}`,body);
        var x=response.data;
        return await x;
      } catch (error) {
        return error;
      
      }} 
      const putData = async (url:string, body:object) => {
        try {
          let response = await axios.put(`${BASE_URL}/${url}`, body);
          return response.data;
        } catch (error) {
        }
      }
      const deleteData = async (url:string) => {
        try {
          let response = await axios.delete(`${BASE_URL}/${url}`);
          return response.data;
        } catch (error) {
        }
      }
      return { getData,postData,putData,deleteData};

}