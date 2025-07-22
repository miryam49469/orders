import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import swal from "sweetalert";
import * as yup from "yup";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useStyles from "./signUp.styles";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/config";
import { log } from "console";
import currencyReducer from '../../redux/currencySlice';
import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../../redux/store';
import ICurrencyState from '../../redux/currencySlice';
const validationSchema = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  companyName: yup.string().required("Name is required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
const SignUpForm: React.FC = () => {
  
  const [isFormValid, setFormValid] = React.useState(true);
  const [listCurrencies, setlistCurrencies] = React.useState([]);  
  const [currency, setCurrency] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
 // const listCurrencies = useAppSelector(state => state.currencyReducer.listCurrencies);
 useEffect(() => {
    currencyRequest()

  }, []);
  useEffect(() => {
    console.log(listCurrencies);
  }, [listCurrencies]);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      termsAccepted: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      async function signUpRequest() {
        try {
          const res = await axios.get(
          `http://localhost:8080/User/signUp?fullName=${values.fullName}&companyName=${values.companyName}&email=${values.email}&password=${values.password}&currency=${currency}`
          );
          sessionStorage.setItem("accessToken", res.data)
          navigate("/LandingPage");
          
          return res.data;
        } catch (error: any) {
          if (error.isAxiosError){
          console.log(error);
          if (error.response['status']!==500)
            swal("Sorry", `${error.response['data']}`, "error");
        }
        else{
          swal("Server is not connect");
        }}
      }
      signUpRequest();
    },
  });
  const currencyRequest = async () => {
    await axios.get("http://localhost:8080/GetCurrency").then(res => setlistCurrencies(res.data));

  }

  
 
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={{ width: "80% " }}
          margin="normal"
          id="fullName"
          label="Full Name"
          name="fullName"
          autoComplete="name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          style={{ width: "60%",marginRight:"15px" }}
          margin="normal"
          id="companyName"
          label="Company Name"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
  <Select
    style={{ width: "15%",top:"16px" }}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    placeholder="currency"
    value={currency}
    onChange={handleChange}
  >
    {listCurrencies.map((currency: string) => 
    <MenuItem value={currency}>{currency}</MenuItem>
 )}
  </Select>
        <TextField
          style={{ width: "80% " }}
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          style={{ width: "80%" }}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              id="termsAccepted"
              name="termsAccepted"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color="primary"
            />
          }
          label={
            <span>
              I agree to the{" "}
              <a href="http://localhost:3000/">Tems of service</a> and{" "}
              <a href="http://localhost:3000/">Privacy Policy</a>
            </span>
          }
        />
        {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
          <div>{formik.errors.termsAccepted}</div>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          style={{
            zIndex: 3,
            position: "absolute",
            backgroundColor: "primary",
            borderRadius: "10px",
            top: "60vh",
            right: "6vw",
          }}
        >
          Sign Up
        </Button>
        {/* disabled={isFormValid}  */}
      </form>
    </div>
  );
};

export default SignUpForm;
