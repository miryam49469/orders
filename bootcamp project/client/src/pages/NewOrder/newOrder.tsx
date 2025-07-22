import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { UseCrud } from '../../redux/useCrud';
import { Dispatch } from 'redux';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProduct } from '../../types/Iorder';
import { IProductCategory } from '../../types/Iorder';
import { IOrderItems } from '../../types/Iorder';
import { IOrder } from '../../types/Iorder';
import { IUsers } from '../../types/Iorder';
import PendingOrders from "../../pages/pendingOrders"
import { getAllOrders } from "../../redux/dispatch"
import { Formik, Form, Field, ErrorMessage } from "formik";
import Grid from '@mui/material/Grid'; // Grid version 1
import InputLabel from '@mui/material/InputLabel';
import gift from '../../gifts.png'
import { elementAcceptingRef } from '@mui/utils';
// import { keys } from '@mui/system';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { log } from 'console';
import { useNavigate } from 'react-router-dom';
import NewOrderModel from './NewOrderModel';
import Paper from '@mui/material/Paper';
import { PALLETE } from "../../config/config";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { number } from 'yup';
import {
   DetailsDiv,
   GiftImg,
   OpenDialog,
   BackImg,
   TextSide,
} from "./newOrder.style";
import {
   DialogContent,
   FormHelperText,
   DialogTitle
} from "@mui/material";
import { IUser } from '../../types/IUser';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
interface NewOrderProps{
  handleClose2?: () => void;
  
}


const NewOrder: React.FC<NewOrderProps> = ({ handleClose2}) => {
   const { getData, postData, putData, deleteData } = UseCrud();
   const [customers, setCustomers] = useState<IUsers[]>([]);
   const [user, setUser] = useState<IUsers>();

   const [currency, setCurrency] = useState<string[]>([]);
   const [products, setProducts] = useState<IProduct[]>([]);
   const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);
   const [sumOfPrice, setSumOfPrice] = useState<any>(0);
   const [selectedValueProduct, setSelectedValueProduct] = useState<string | null>(null);
   const [selectedValueCostumer, setSelectedValueCostumer] = useState<string | null>(null);

   const [quantity, setQuantity] = useState<number>(1);
   const [order, setOrder] = useState<IOrder>();
   const [productResult, setProductResult] = useState<object[]>([]);
   const [orderIsReady, setOrderIsReady] = useState(0);
   const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(null);
   const navigate = useNavigate();

   let arr = []
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [currencyMap, setCurrencyMap] = useState<string>("SHEKEL");
   const [currencySymbol, setCurrencySymbol] = useState<string>('₪');

   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const handleMenuItemClick = (text: string) => () => {
      setSelectedMenuItem(text);
      setAnchorEl(null);
   };
   const getFunc = async (url: string) => {

      let result = await getData(url);
      if (url == "User") {
         setCustomers(result);
      }

      if (url == "product/byCompany") {
         console.log(result);

         setProducts(result);
      }
      if (url == "GetCurrency") {
         setCurrency(result);
      }
   }
   const postFunc = async (url: string, body: object) => {

      let result = await postData(url, body);
      if (url == "order")
         return;
      setProductResult(result);
      if (url === "order/CalculateOrderAmount") {
         console.log(result);
         let val = result[-1];
         if (val != null) {
            const targetValue = -1;
            const targetKey = Object.keys(val).find((key) => val[key] === targetValue);
            setSumOfPrice(targetKey);
         }
      }

   }
   const getAmount = (name: string, ammount: number) => {
      let product: any;
      for (let i = 0; i < products.length; i++) {
         if (products[i].name == name) {
            product = products[i]
            break;
         }
      }
      const id: string = product.id;
      const updatedOrderItems = orderItems.map(item => {
         if (item.productId.id == id) {
            // Update the amount for the specific product
            return { ...item, amount: ammount };
         } else {
            return item;
         }
      });

      setOrderItems(updatedOrderItems);
      return ammount;
   }
   const addToCart = () => {
      let product: any;
      for (let i = 0; i < products.length; i++) {
         if (products[i].name == selectedValueProduct) {
            product = products[i]
            break;
         }
      }
      product = { "productId": product, "quantity": quantity, "ammount": "" };
      setOrderItems((prevCart) => [...prevCart, product])
   }
   const buyNow = () => {
      let product: any;
      if (order?.cvc && order?.expiryOn && order?.creditCardNumber) {
         console.log(order);
         postFunc("order", order);
         if(handleClose2){
         handleClose2();}
      };
   }
   const Delete = (i: number) => {

      setOrderItems(prevOrderItems => {
         const updatedItems = prevOrderItems.filter((_, index) => index !== i);
         return updatedItems;
      });
   };

   const handleInputChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const lable = event.target.value;
      if (type == "quantity")
         setQuantity(parseInt(lable));
      if (type == "credit card number") {
            
         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            creditCardNumber: lable,
         }));
      }
      if (type == "expiers on") {

         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            expiryOn: lable,
         }));
      }
      if (type == "cvc") {

         setOrder((prevOrder: any | undefined) => ({
            ...prevOrder,
            cvc: lable,
         }));
      }
      
      setOrder((prevOrder: any) => ({
         ...prevOrder,
         totalAmount: sumOfPrice,
         customer: user,
         orderItems: orderItems,
         orderStatusId: "Approved"
      }));
   };
   useEffect(() => {
      if (selectedMenuItem) {
         setCurrencyMap(selectedMenuItem);
         let a: string = '$';
         if (selectedMenuItem == "DOLLAR")
            setCurrencySymbol(a);
      }

   }, [selectedMenuItem])

   useEffect(() => {
      if (customers.length == 0) {
         getFunc("User")
      }
      if (products.length == 0) {
         getFunc("product/byCompany");
      }
      if (currency.length == 0) {
         getFunc("GetCurrency");
      }
   }, []);

   useEffect(() => {
      interface ICalculateOrder {
         currency: string;
         orderItems?: IOrderItems;
         customer: IUsers
      }
      if (orderItems.length > 0 && currencyMap) {

         postFunc("order/CalculateOrderAmount", { currency: currencyMap, orderItems: orderItems });
      }
   }, [orderItems, currencyMap])

   useEffect(() => {
let selected:any;
      for (let i = 0; i < customers.length; i++) {
         if (customers[i].fullName == selectedValueCostumer) {
            selected = customers[i]
            break;
         }
      }
setUser(selected)
   }, [selectedValueCostumer])
   return (
      <div>
         <DialogContent sx={{ p: 0, height: "150vh" }}>
            <DetailsDiv>
               <DialogTitle sx={{ fontSize: 35, pl: "3rem", fontWeight: "bold" }}>
                  New Order
               </DialogTitle>
               <DialogContent style={{ paddingLeft: "2rem" }}>
                  <Grid
                     container
                     spacing={2}
                     direction="column"
                     justifyContent="center"
                     alignItems="center"
                  />


                  {
                     <>

                        <br></br>
                        <Autocomplete
                           sx={{ width: "45%", right: 700 }}
                           disablePortal
                           id="combo-box-demo"
                           options={customers}
                           getOptionLabel={(option) => option.fullName}
                           onChange={(event, newValue) => setSelectedValueCostumer(newValue ? newValue.fullName : null)}
                           renderInput={(params) => <TextField {...params} label="customers" />}
                        />
                        <br></br>
                        <Autocomplete
                           sx={{ width: "45%", right: 700 }}
                           disablePortal
                           id="combo-box-demo"
                           options={products}
                           getOptionLabel={(option) => option.name}
                           onChange={(event, newValue) => setSelectedValueProduct(newValue ? newValue.name : null)}
                           renderInput={(params) => <TextField {...params} label="Products" />}
                        />
                        <br></br>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', alignItems: 'center' }}>
                           {currency && (
                              <div>
                                 <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                 >
                                    Currency
                                 </Button>
                                 <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                       'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                 >
                                    {currency.map((i) => (
                                       <MenuItem key={i} onClick={handleMenuItemClick(i)}>
                                          {i}
                                       </MenuItem>
                                    ))}
                                 </Menu>
                              </div>
                           )}

                           <TextField
                              label="quantity"
                              type="number"
                              sx={{ width: "40%", right: 105 }}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange('quantity', e) }}
                           />

                        </div>

                        <div style={{ position: 'absolute', top: 50, right: 350 }}>
                           price: {sumOfPrice} {currencySymbol}
                        </div>
                        {
                           <Button sx={{
                              width: 250,
                              mt: 2,
                              backgroundColor: `${PALLETE.BLUE} !important`,
                              //  width: "17vw",
                              color: `${PALLETE.WHITE} !important`,
                           }} variant="text" onClick={addToCart}> add</Button>

                        }
                        {productResult ? (
                           <Grid item style={{ position: 'absolute', top: 100, right: 270 }}>

                              <p>products list:</p>
                              {delete productResult[-1]}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', top: 200, right: 650 }}>
                                 {Object.entries(productResult).map(([i, innerObj], index) => (
                                    <div key={index} style={{ display: 'flex', width: '100%', top: 300, right: 650 }}>
                                       <p >{i}</p>
                                       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', top: 300, right: 600 }}>
                                          {Object.entries(innerObj).map(([subKey, value], subIndex) => (
                                             <div key={subIndex} style={{ display: 'flex', top: 200, right: 450 }}>
                                                <p>-{value} {subKey} {currencySymbol}</p>
                                                <Button><DeleteIcon onClick={() => { Delete(index) }} /></Button>
                                                {/* {getAmount(i,parseInt(subKey))}  */}

                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 ))}
                              </div>


                           </Grid>

                        ) : (
                           <></>
                        )}
                        <br></br>
                        <br></br>
                        <TextField label="credit card number"  sx={{ width: 250 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange("credit card number", e) }} />
                        <br></br>
                        <br></br>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                           <br></br>

                           <TextField
                              label="expiers on"
                              sx={{ width: 120, textAlign: 'left', marginRight: '10px' }}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                 handleInputChange("expiers on", e);
                              }}
                           />
                           <br></br>
                           <TextField
                              label="cvc"
                              sx={{ width: 120, textAlign: 'left' }}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                 handleInputChange("cvc", e);
                              }}
                           />
                        </div>


                        <br></br>
                        <Button sx={{
                           width: 250,
                           mt: 2,
                           backgroundColor: `${PALLETE.ORANGE} !important`,
                           //  width: "17vw",
                           color: `${PALLETE.WHITE} !important`,
                        }} variant="text" onClick={buyNow}> buy</Button>

                     </>
                  }


               </DialogContent>
            </DetailsDiv>
            <BackImg sx={{ height: "53vh !important", marginBottom: "0vh !important" }}>
               <GiftImg src="gifts.png" sx={{ height: "100% !imporant", marginBottom: "0vh !important" }}></GiftImg>
               <TextSide sx={{ position: "absolute", top: "20vh", zIndex: "10", left: "3vw" }}>we almost done</TextSide>
            </BackImg>
         </DialogContent>

      </div>
   );

};
export default NewOrder;   