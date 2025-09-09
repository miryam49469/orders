import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import  {IOrder}  from '../types/Iorder'
export interface IcurrencyState {
  listCurrencies: string[],
}

const initialState: IcurrencyState = {
  listCurrencies:[],
}
export const currencySlice = createSlice({
  name: 'currencyReducer',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Array<string>>) => {
        state.listCurrencies = action.payload;  
    },
   
  },
})
export const { setCurrency} = currencySlice.actions;
export default currencySlice.reducer;