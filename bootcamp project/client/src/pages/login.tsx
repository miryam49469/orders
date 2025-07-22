import { Link, Button, Dialog, IconButton, Input, InputAdornment, OutlinedInput, Paper, alertClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../style/Login.styles.css';
import SignUp from "./SignUP/SIgnUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL } from "../config/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login: React.FC = (): any => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [showError, setShowError] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const login = async () => {
    try {
      console.log(password)
      console.log(email)
      const res = await axios.get(`${LOGIN_URL}?password=${password}&email=${email}`)
      console.log({ res })
      if (res.status == 200) {
        console.log(res.data)
        sessionStorage.setItem("accessToken", res.data["token"]);
         sessionStorage.setItem("role", res.data["role"]);
           navigate("/pendingOrders")
      }
    }
    catch (error) {
      toast.error("The user is not in the system, check that the username and password are correct")
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className='container'>
        <Paper className='paper'>
          <h1>Order Manager</h1>
          <TextField
          required
          placeholder='example@gmail.com'
          type="email"
          className="name-field"
           onChange={(e) => setEmail(e.target.value)}
        />
          <br />
          <br />
          <TextField
            placeholder="password"
            onBlur={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          />
          <br />
          <Button variant="contained" color="primary" id='logIn-button'  onClick={() => login()}>Log in</Button>
         <br></br>
         <img style={{height:"55px", width:"270px",margin:"10px"}} src="Google.jpg"></img>
          <h3>Don't have an account yet?</h3>
          <Button variant="contained" color="primary" className="register" onClick={handleClickOpen}>Register</Button>
          <Dialog onClose={handleClose} fullWidth maxWidth={'md'} open={open} PaperProps={{ sx: { width: "80%", height: "80%", padding: '0', margin: '0' } }}>
            <SignUp onClose={handleClose} />
          </Dialog>
        </Paper>
      </div>
    </div>
  );
};
export default Login;
