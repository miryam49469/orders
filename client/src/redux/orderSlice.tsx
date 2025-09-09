import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import  {IOrder}  from '../types/Iorder'
export interface IOrdersState {
  orders: IOrder[],
  errorMessage: string,
  shouldDisplayErrorMessage: boolean
}
const initialState: IOrdersState = {
  orders: [],
  errorMessage: "",
  shouldDisplayErrorMessage: false
}
export const ordersSlice = createSlice({
  name: 'ordersReducer',
  initialState,
  reducers: {
      getOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders= action.payload;
    },
    getOrdersFinished:()=>{
                      
    },
    getOrdersFailed:()=>{
      
    }
  },
})
export const { getOrders ,getOrdersFinished,getOrdersFailed} = ordersSlice.actions;
export default ordersSlice.reducer;