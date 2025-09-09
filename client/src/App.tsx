import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routing from './components/routing';
import LandingPage from './pages/landingPage';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { PALLETE } from './config/config';
import GlobalLoader from './components/loader/globalLoader';
import { RootState, useAppDispatch } from './redux/store';
import { useSelector } from 'react-redux';
import './axios/axiosInterceptors';
import { IOrdersState, getOrders, getOrdersFinished,getOrdersFailed } from './redux/orderSlice';
import NewOrder from './pages/NewOrder/newOrder';
import Axios from './axios/axiosInterceptors';
//import { Dashboard } from '@mui/icons-material';
 import Dashboard from './pages/dashboard';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main:`${PALLETE.ORANGE}`,
      },
      secondary: {
        main:`${PALLETE.WHITE}` ,
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });
  const Orders: IOrdersState = useSelector<RootState, IOrdersState>(state => {
    return state.ordersReducer
  })
  const dispatch = useAppDispatch()
  return (<>
  <Axios Error={false} />
  {/* <GlobalLoader/> */}
  <ThemeProvider theme={theme}>
    <Routing/> 
    </ThemeProvider>
   
 </> );
}
export default App;