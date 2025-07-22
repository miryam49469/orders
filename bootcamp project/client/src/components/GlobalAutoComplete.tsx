import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const GlobalAutoComplete = (props: any) => {
  const [data, setData] = useState([{ id: "", name: "" }]);
  let requestTimeout: NodeJS.Timeout | null = null;
  const { path,whatChoose } = props;
  const widthInput =props.width!==undefined? props.width:300
  const heightInput =props.height!==undefined? props.height:50
  const getOptionsByProfix = async (
    event: any,
    value: string,
    path: string
  ) => {
    console.log(new Date().toISOString(), value);
    if (requestTimeout) {
      clearTimeout(requestTimeout);
    }
    if (value.length > 2) {
      requestTimeout = setTimeout(() => {
        console.log(
          "value:",
          value,
          "is send to server at:",
          new Date().toISOString()
        );
        axios
          .get(`http://localhost:8080${path}/${value}`)
          .then((response) => {
            setData(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(`http://localhost:8080${path}/${value}`);
            console.log(error);
          });
      }, 1000);
    }
  };

  const handleClickShowPassword = (event: any) => {
    console.log("event", event);
    if (whatChoose!==undefined ) {
      whatChoose(event);
      console.log(event);
    }
  };
  return (
    <>
      <Autocomplete
        // disablePortal
        id="Autocomplete"
        options={data}
        sx={{height: heightInput, width: widthInput}}
        onInputChange={(event: any, value: string) =>
          getOptionsByProfix(event, value, props.path)
        }
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(e, value) => handleClickShowPassword(value)}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};

export default GlobalAutoComplete;

