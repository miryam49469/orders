// import { styled } from "@mui/system";

// export const MyBox = styled("div")({
//   display: "inline-block !important",
//   marginRight: "6%",
//   marginLeft: "6%",
//   minWidth: 120,
//   marginBottom: "3vh",
// });

// // export const MyInput = styled("div")({
// //   // width:"30px",
// //   display: "inline-grid",
// //   margin: "0%",
// //   overflow: "hidden",
// //   padding: "0px",
// // });

// export const MyInput = styled("div")({
//     display: "inline-grid !important", // Set to inline-grid
//     gridTemplateColumns: "1fr 1fr !important", // Set the width of each column
//     alignItems: "center !important", // Align items vertically in the center
//     gap: "1px", // Add some gap between the elements
//     padding: "0px !important", // Add some padding
//   });

import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers-pro";
import GlobalAutoComplete from "../../components/GlobalAutoComplete";

export const MyBox = styled("div")({
  display: "inline-block",
  marginRight: "6%",
  marginLeft: "6%",
  minWidth: 120,
  marginBottom: "3vh",
});

export const MyInput = styled("div")({
  display: "inline-block",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  gap: "5px",
  margin:"float",
});

export const SmallDatePicker = styled(DatePicker)({
  width: "100px !important",
  display: "inline-block",
  margin:"float",
});

export const SmallAutoComplete = styled(GlobalAutoComplete)({
  width: "5px !important",
  margin:"float",
});
