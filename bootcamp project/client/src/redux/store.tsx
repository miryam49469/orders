import { configureStore } from "@reduxjs/toolkit";
import ordersReducer, { getOrders, getOrdersFinished, getOrdersFailed } from './orderSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import loaderReducer from './loaderSlice';
import currencyReducer from './currencySlice';
import Interceptor from '../axios/axiosInterceptors';

export const store = configureStore({
 
  reducer: {
    ordersReducer,
    loaderReducer,
    currencyReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


  


