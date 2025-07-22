import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MyBox, MyInput } from "./FilterPop.Style";
import { DataToFilter, FilterItem } from "./DataToFilter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import GlobalAutoComplete from "../../components/GlobalAutoComplete";
import { Height } from "@mui/icons-material";

const FilterPop = (props: any) => {
  const [value, setValue] = useState();
  const [show, setShow] = useState(false);
  const [indexData, setIndexData] = useState(0);
  const { keyIndex , changeFieldName,changeFilterValue} = props;
  const [dataToShow, setDataToShow] = useState<FilterItem | undefined>(undefined);
  const [fieldToFilter, setFieldToFilter] = useState<string>();

  const handleChangeValue = (event:any) => {
    if((dataToShow?.fieldName === "status") || (dataToShow?.fieldName === "price") || (dataToShow?.fieldName === "priority")){
      const selectedIndex = parseInt(event.target.value);
      changeFilterValue(DataToFilter[indexData].value[event.target.value],keyIndex);
      return;
    }
    if((dataToShow?.fieldName === "customer") || (dataToShow?.fieldName === "product")){
      console.log("event val",event)
      changeFilterValue(event.name,keyIndex);
      return;
    }
   // changeFilterValue(event.target.value, keyIndex);
    // setValue(event.target.value);
  };

  const handleChangeFieldToFilter =  (event: SelectChangeEvent) => {
    const selectedIndex = parseInt(event.target.value);
    setIndexData(parseInt(event.target.value))
    if (!isNaN(selectedIndex)) {
       setIndexData(selectedIndex);
       setFieldToFilter(DataToFilter[selectedIndex].fieldName);
       changeFieldName(DataToFilter[selectedIndex].fieldName, keyIndex);
       setShow(true);
       const selectedItem =  DataToFilter.find((item) => item.fieldName === DataToFilter[selectedIndex].fieldName);
       setDataToShow(selectedItem);
    }
  };
  useEffect(() =>{console.log(keyIndex)},[keyIndex])
  return (
    <>
      <Box sx={{ minWidth: 450, maxWidth: 1000 }}>
        <label>where</label>
        <MyBox>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="filter" classes={InputLabel}>
                Select filter
              </InputLabel>
              <Select
                labelId="filter"
                id="filter"
                value={fieldToFilter}
                label="FieldToFilter"
                onChange={handleChangeFieldToFilter}
                sx={{
                  height: "36px",
                }}
              >
                {DataToFilter.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.fieldName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </MyBox>
        <label>is</label>
        <MyBox>
          <Box>
            <FormControl fullWidth> 
              <InputLabel id="filter" classes={InputLabel}></InputLabel>
              {(indexData==0||(dataToShow?.fieldName === "status") || (dataToShow?.fieldName === "priority")) && (
                <Select
                  labelId="filter"
                  id="filter"
                  value={value}
                  label="Value"
                  onChange={handleChangeValue}
                  sx={{ height: "36px" }}
                >
                  {show &&
                    dataToShow?.value.map((item: any, index: number) => (
                      <MenuItem value={index} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              )}
              {dataToShow?.fieldName === "price"&&
                <div>
                  <input type="number" style={{height:30,width:60,margin:8}}></input>
                  <input type="number" style={{height:30,width:60}}></input>
                </div>
              }
              {dataToShow?.fieldName === "customer"  && (
                <div style={{display:"inline",width:"20%"}}>
                <GlobalAutoComplete
                  path={`/user/getNamesOfCustomersByPrefix`}
                  whatChoose={handleChangeValue}
                  width={160}
                  height={3}
                ></GlobalAutoComplete></div>
              )}
              {dataToShow?.fieldName === "product"&& (
                <GlobalAutoComplete
                  path={"/product/names"}
                  whatChoose={handleChangeValue}
                  width={160}
                  height={3}
                ></GlobalAutoComplete>
              )} 
              {dataToShow?.fieldName === "date"&& (
                <>
                  <MyInput>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="From date"
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </MyInput>
                  <MyInput>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="To date"
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </MyInput>
                </>
              )}
            </FormControl>
          </Box>
        </MyBox>
      </Box>
    </>
  );
};

export default FilterPop;