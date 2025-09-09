import { AppDispatch } from './store' 
import { UseCrud } from './useCrud';
import ordersReducer, { getOrders, getOrdersFinished, getOrdersFailed } from './orderSlice';


  
export const getAllOrders = () => {
    
const { getData, postData, putData } = UseCrud();
  return async (dispatch: AppDispatch) => {
    try {
      let orders =  await getData("order/");
      dispatch( getOrders(orders))
    }
    catch (error) {
      dispatch(getOrdersFailed())
    }
  }
}