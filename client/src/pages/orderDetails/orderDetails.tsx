import React from "react";
import Dialog from "@mui/material/Dialog";
import { Link, DialogTitle } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {
  DetailsDiv,
  GiftImg,
  OpenDialog,
  BackImg,
  TextSide,
} from "./globalModelDialog.style";
import ArrowCircleUpSharpIcon from "@mui/icons-material/ArrowCircleUpSharp";
import { Divider, Typography } from "@mui/material";
import {
  Autocomplete,
  Button,
  DialogContent,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { CssBaseline } from "@mui/material";
import { UseCrud } from "../../redux/useCrud";
import {
  IOrder,
  IProduct,
  IOrderItems
} from "../../types/Iorder";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { IProduct } from '../types/Iorder';
import { getAllOrders } from "../../redux/dispatch";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
// import {balloon} from '../images/baloon.png'
// import {baloon} from '../../images/baloon.png'
import InputLabel from "@mui/material/InputLabel";
import { MyTxtField, MyFieldContainer } from "./NewOrderForm.style";
import { log } from "console";
import { PALLETE } from "../../config/config";
import { number } from "yup";
import { left } from "@popperjs/core";
import axios from "axios";
interface OrderDetailsProps{
  onClose?: () => void;
  
}
export default function OrderDetails({ onCloseO, id }: any) {
  const { getData, postData, putData, deleteData } = UseCrud();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [costumers, setCustomers] = useState<object[]>([]);
  const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);
  const [productResult, setProductResult] = useState<object[]>([]);
  const [sumOfPrice, setSumOfPrice] = useState<any>(0);
  const [selectedValueProduct, setSelectedValueProduct] = useState<
    string | null
  >(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [order, setOrder] = useState<IOrder>();
  const [isOpen, setIsOpen] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState();
  const [cvc, setCvc] = useState("");
  const [expiryOn, setExpiryOn] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setamount] = useState(0);
  const [currencyMap, setCurrencyMap] = useState<CurrencyMap>({ key: 'ש"ח', value: 1 });
  const [currency, setCurrency] = useState<string[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(null);
 interface CurrencyMap {
    key: string;
    value: number;
  }
  let flag = false
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let arrey: IProduct[] = [];
  let arr = [];
  const postFunc = async (url: string, body: object) => {
    let result = await postData(url, body);
    
    setProductResult(result);
    if (url === "order/CalculateOrderAmount") {
      let val = result[-1];
      const targetValue = -1;
      const targetKey = Object.keys(val).find((key) => val[key] === targetValue);
      setSumOfPrice(targetKey);
    }
  }
  const getFunc = async (url: string) => {
    let result = await getData(url);
    if (url != "product") {
      console.log("price:", result?.totalAmount);
      setOrder(result);
      setOrderItems(result?.orderItems);
      setSumOfPrice(result?.totalAmount);
      // setOrderItems(order?.orderItems)
      // getCurrencyProducts()
      // console.log(order?.orderItems[0].productId.name)
    }
    if (url == "product") {
      setProducts(result);
    }
    if (url == "GetCurrency") {
      setCurrency(result);
    }
  };
  const handleInputChange = (
    type: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const lable = event.target.value;
    if (type == "quantity") {
      const parsedNumber = parseInt(lable, 10);
      setQuantity(parsedNumber);
    }
    if (type == "creditCardNumber") {
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
      orderItems: orderItems,
    }));
  };
  const handleMenuItemClick = (text: string) => () => {
    setSelectedMenuItem(text);
    setAnchorEl(null);
  };
  const dellProduct = (name: string, amount: number) => {

    // let updateItems:IOrderItems
    let prod = orderItems.find((item) => item.productId.name == name);
    const updateItems = orderItems?.filter(
      (item) => item.productId.name != name
    );
    //    updateItems?.forEach(item => { arrey.push(item.productId) });
    if (updateItems != undefined) {
    }
    console.log("order after change", order);
    setOrderItems(updateItems);
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      totalAmount: sumOfPrice,
      orderItems: orderItems,
    }));
  };
  useEffect(() => {
    if (selectedMenuItem == "DOLLAR") {
      const x: CurrencyMap = { key: "$", value: 3.5 };
      setCurrencyMap(x);
    }
  }, [selectedMenuItem])
  useEffect(() => {
    getFunc(`order/${id}`);
  }, []);
  // useEffect(() => {
  //   console.log("orderItemsBefore", orderItems)
  //   postFunc("order/CalculateOrderAmount", { orderItems });
  // }, [orderItems])
  useEffect(() => {
    if (products.length == 0) {
      getFunc("product");
    }
  }, []);
  useEffect(() => {
    if(orderItems.length>0){
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      orderItems: orderItems,
    }));}
    console.log("miryam thank you", orderItems);
  }, [orderItems]);
  const sameProd = (i: IOrderItems, quantuty: number) => {
    orderItems.forEach(item => { if (item == i) { item.quantity = item.quantity + quantuty } })
    setOrderItems(orderItems)
    setOrder((prevOrder: any | undefined) => ({
      ...prevOrder,
      orderItems: orderItems,
    }))
    flag = true
  }
  
  const addToCart = () => {
    
    let product: any;
    for (let i = 0; i < products.length; i++) {
      if (products[i].name == selectedValueProduct) {
        product = products[i];
        break;
      }
    }
    // let amount = quantity * product.price;
    // product = { productId: product, quantity: quantity };
    // orderItems.forEach(item => {
    //   if (item.productId.name == selectedValueProduct) {
    //     sameProd(item, product.quantity);
    //   }
    // })
    
    product = { "productId": product, "quantity": quantity, "ammount": "" };
    console.log(product);
    
      setOrderItems((prevCart) => [...prevCart, product])
      

    //if (!flag) {
      //setOrderItems((prevCart) => [...prevCart, product]);
      // setPrice(product.amount)
      // setSumOfPrice(sumOfPrice + product.amount);
      setOrder((prevOrder: any) => ({
        ...prevOrder,
        orderItems: orderItems,
        totalAmount: sumOfPrice,
      }));
    //}
  };
  useEffect(() => {
    if (order) {

       postFunc("order/CalculateOrderAmount", { currency: order.currency, orderItems: orderItems });
    }
 }, [orderItems])
  const saveChanges = async (e: any) => {
    if (order) {
      console.log(order);
       order.orderStatusId="Approved"
       setOrder(order)
      let result = await putData("order", order);
      // let result = await axios.put("http://localhost:8080/order",order)
      console.log(result);
      if(onCloseO){
        onCloseO();}
    }
  };
  const cancelOrder = (id: string | undefined) => { };
  return (
    <div >
      <DialogContent sx={{ p: 0, height: "30vh" }}>
        <DetailsDiv>
          <DialogTitle sx={{ fontSize: 35, pl: "3rem", fontWeight: "bold" }}>
            Order's details
          </DialogTitle>
          <DialogContent style={{ paddingLeft: "2rem" }}>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <ToastContainer />
              {products ? (
                <>
                  {getAllOrders()}
                  <div
                    style={{ position: "absolute", left: "1vw", top: "10vh", width: "30vw" }}
                  >
                    <br></br>
                    <FormHelperText>customer</FormHelperText>
                    {/* <br></br> */}
                    <TextField
                      sx={{ width: "70%" }}
                      value={order?.customer.fullName}
                      aria-readonly
                    ></TextField>
                    <FormHelperText>Product</FormHelperText>
                    {/* <br></br> */}
                    <Autocomplete
                      sx={{ width: "49%", right: 700 }}
                      disablePortal
                      id="combo-box-demo"
                      options={products}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) =>
                        setSelectedValueProduct(newValue ? newValue.name : null)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Products" />
                      )}
                    />
                    <br></br>
                    <div style={{ position: "absolute", left: "51%", top: "16.5vh" }}>
                      <TextField
                        type="number"
                        label="quantity"
                        sx={{ width: "50%" }}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleInputChange("quantity", e);
                        }}
                      />
                    </div>
                    {currency ? <>
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
                    </> : <></>}
                    <br></br>
                    <br></br>
                    <Button
                      onClick={() => addToCart()}
                      sx={{
                        mt: 2,
                        backgroundColor: `${PALLETE.BLUE} !important`,
                        width: "70%",
                        position: "absolute",
                        top: "24vh",
                        color: `${PALLETE.WHITE} !important`,
                      }}
                      type="submit"
                    //   disabled={!isValid}
                    >
                      ADD
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {sumOfPrice ? (
                <div style={{ left: "42%", position: "absolute" }}>
                  price: {sumOfPrice}
                </div>
              ) : (
                <></>
              )}
            </Grid>
            <div style={{ position: "absolute", left: "44%", top: "20vh" }}>
              <Grid container spacing={2}>
                <h5>productList:</h5>
              </Grid>
              {productResult ? (
                <>
                      {delete productResult[-1]}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', top: 200, right: 650 }}>
                                 {Object.entries(productResult).map(([i, innerObj], index) => (
                                    <div key={index} style={{ display: 'flex', width: '100%', top: 300, right: 650 }}>
                                       <p >{i}</p>
                                       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', top: 300, right: 600 }}>
                                          {Object.entries(innerObj).map(([subKey, value], subIndex) => (
                                             <div key={subIndex} style={{ display: 'flex', top: 200, right: 450 }}>
                                                <p>-{value} {subKey} </p>
                                                <Button
                        sx={{ mt: 0, p: 0 }}
                        // onClick={() =>
                        //  // dellProduct(orderItems.productId?.name, orderItems.productId?.amount)
                        // }
                      >
                        X
                      </Button>
                                                {/* {getAmount(i,parseInt(subKey))}  */}

                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 ))}
                              </div>


                    
                </>
              ) : (
                <></>
              )}
            </div>
            <div style={{ position: "absolute", top: "40vh" }}>
              <Divider sx={{ mt: 6 }} />
              <Typography>
                Paid with a credit card ending in digits:{" "}
                {order?.creditCardNumber.toString().substring(12)}
              </Typography>
              <Button onClick={toggleOpen}>
                {isOpen ? "CHANGE" : " change credit card details"}
              </Button>
              {isOpen && (
                <div style={{ position: "absolute", width: "60vw" }}>
                  <TextField
                    type="number"
                    label="creditCardNumber"
                    sx={{ width: 120, textAlign: "right" }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange("creditCardNumber", e);
                    }}
                  />
                  <TextField
                    type="string"
                    // label="expiers on"
                    sx={{ width: 120, textAlign: "left" }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange("expiers on", e);
                    }}
                  />
                  <TextField
                    type="string"
                    label="cvc"
                    sx={{ width: 120, textAlign: "left" }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange("cvc", e);
                    }}
                  />
                </div>
              )}
              <br></br>
              <div style={{ top: "25vh", position: "absolute", width: "100%" }}>
                <div style={{ position: "absolute" }}>
                  <Button
                    onClick={() => cancelOrder(order?.id)}
                    sx={{
                      mt: 2,
                      backgroundColor: `${PALLETE.ORANGE} !important`,
                      width: "17vw",
                      color: `${PALLETE.WHITE} !important`,
                    }}
                    type="submit"
                  //   disabled={!isValid}
                  >
                    Cancel Order
                  </Button>
                </div>
                <div style={{ position: "absolute", left: "80%" }}>
                  <Button
                    sx={{
                      mt: 2,
                      left: "10% !important",
                      backgroundColor: `${PALLETE.GREEN} !important`,
                      width: "17vw",
                      color: `${PALLETE.WHITE} !important`,
                    }}
                    type="submit"
                    // disabled={!isValid}
                    onClick={(e) => saveChanges(e)}
                    
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </DetailsDiv>
        <BackImg sx={{ height: "53vh !important", marginBottom: "0vh !important" }}>
          <GiftImg src="gifts.png" sx={{ height: "100% !imporant", marginBottom: "0vh !important" }}></GiftImg>
          <TextSide sx={{ position: "absolute", top: "20vh", zIndex: "10", left: "3vw" }}>we almost done</TextSide>
        </BackImg>
      </DialogContent>
    </div>
  );
}









