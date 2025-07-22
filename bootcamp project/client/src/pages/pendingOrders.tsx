
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { GET_ALL_ORDERS_URL } from '../config/config';
import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import { UseCrud } from "../redux/useCrud"
import { LocalHospitalTwoTone } from '@mui/icons-material';
import { array } from 'yup';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { IpandingOrder } from '../types/Iorder';
import { IOrder } from '../types/Iorder';
import { useEffect, useState } from 'react';
import '../style/pendingOrders.styles.css';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LandingPage from './landingPage';
import { Outlet } from 'react-router-dom';
import { Link, Dialog } from "@mui/material";
import OrderDetails from "./orderDetails/orderDetails";
import GlobalPopOver from '../components/GlobalPopOver';
import AllFilter from './filterPop/AllFilter';
import NewOrder from './NewOrder/newOrder';

interface PendingOrdersProps {
  order?: IOrder;
}
interface PendingOrdersProps {
  order?: IOrder;
}





let orders: IOrder[] = [];


const PendingOrders: React.FC = () => {
  const filterTables = (filters: any) => {
    //כאן אמור ליהיות השליחה לשרת!!!
    const ordersStatus = ['New']

    getOrders(ordersStatus)
    console.log(filters)
  }

  let currentRows: any[] = []


  const [Rows, setRows] = useState<any[]>([]);
  const [Rows2, setRows2] = useState<any[]>([]);
  const [id, setId] = React.useState("");
  const [secondPaginationModel, setsecondPaginationModel] = React.useState({
    page: 0,
    pageSize: 3,
  });
  const [firstPaginationModel, setfirstPaginationModel] = React.useState({
    page: 0,
    pageSize: 3,
  });
  const handleButtonClick = (id: any) => {
    // Handle the button click event here. You can perform any action you want.
    setId(id)
    handleClickOpen()
    console.log(`Button clicked for row with ID ${id}`);
  };
  const columns: GridColDef[] = [

    { field: 'products', headerName: 'Products', width: 300 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    {
      field: 'status', type: 'string', headerName: 'Status', width: 100,
      cellClassName: (params: GridCellParams<any, string>) => {
        if (params.value == null) {
          return '';
        }
        if (params.value == 'Charging')
          return 'Charging';
        if (params.value == 'Delivered')
          return 'Delivered';
        if (params.value == 'Packing')
          return 'Packing';
        if (params.value == 'Approved')
          return 'Approved';
        if (params.value == 'Cancelled')
          return 'Cancelled';
        if (params.value == 'New')
          return 'Delivered';
        return ''
      },
    },
    { field: 'price', headerName: 'Price', width: 100 },

    { field: 'date', type: 'date', headerName: 'Date', width: 200 }

    , {
      field: 'actions', headerName: 'UPDATE', width: 150, renderCell: (params) => {
        return (
          <EditIcon
            style={{ cursor: 'pointer' }}
            onClick={() => handleButtonClick(params.row.id)}
          />
          // <button onClick={() => handleButtonClick(params.row.id)}>Update Order</button>
        );
      }
    },



  ];
  const getOrders = async (ordersStatus: any) => {

    try {


      //const ordersStatus = ['Cancelled']


      const res = await axios.get(`${GET_ALL_ORDERS_URL}/${ordersStatus}/${firstPaginationModel.page}`)
      if (res.status == 200) {

        let orders: IOrder[] = [];
        orders = res.data;
        let currentRows: any[] = []
        orders.forEach(e => {
          let AllPrudocts = e.orderItems.map((p) => `${p.quantity} ${p.productId.name}`);


          currentRows.push({ id: e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer': e.customer.fullName, 'products': AllPrudocts, 'date': new Date(e.auditData.createDate) })
        }

        )

        setRows(currentRows)

      }
    }
    catch (error) {
      alert(error);

    }
  }
  const getOrders2 = async () => {

    try {
      console.log("opo");


      const ordersStatus = ['Approved', 'Charging', 'Packing', 'New',]

      const res = await axios.get(`${GET_ALL_ORDERS_URL}/${ordersStatus}/${secondPaginationModel.page}`)
      if (res.status == 200) {
        console.log(res.data);

        let orders: IOrder[] = [];
        orders = res.data;
        let currentRows: any[] = []
        orders.forEach(e => {
          let AllPrudocts = e.orderItems.map((p) => `${p.quantity} ${p.productId.name}`);

          currentRows.push({
            id: e.id, 'price': e.totalAmount, 'status': e.orderStatusId, 'customer': e.customer.fullName, 'products': AllPrudocts.join(', '), 'date': new Date(e.auditData.createDate)


          })


        }

        )

        setRows2(currentRows)

      }
    }


    catch (error) {
      alert(error)

    }
  }





  useEffect(() => {

    getOrders2();

  }, [secondPaginationModel]);
  useEffect(() => {
    const ordersStatus = ['Cancelled']

    getOrders(ordersStatus);

  }, [firstPaginationModel]);

  let navigater = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const nav = () => {
    navigater(`/newOrder`)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div>

      <LandingPage></LandingPage>
      <br></br>
      <Box
        sx={{
          height: '30%',
          marginLeft: '10%',
          width: '80%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            style={{
              backgroundColor: 'rgb(235, 159, 110)',
              color: 'white',
              marginRight: '10px', // Add margin to separate the buttons
            }}
            onClick={handleClickOpen2}
          >
            New order
          </Button>

          <Dialog
            onClose={handleClose2}
            fullWidth
            maxWidth={'md'}
            open={open2}
            PaperProps={{ sx: { width: '80%', height: '80%', padding: '0', margin: '0' } }}
          >
            <NewOrder handleClose2={handleClose2} />
          </Dialog>

          <GlobalPopOver
            name={'filter'}
            Pop={AllFilter}
            filterTables={filterTables}
          ></GlobalPopOver>
        </div>
        <br></br>

        <ArrowCircleDownIcon style={{ color: 'rgb(238,105,106)', paddingLeft: '7px' }}></ArrowCircleDownIcon>
        <span style={{ color: 'rgb(238,105,106)', padding: '7px', verticalAlign: 'super' }}>{"Top priority"}</span>


        <br></br>

        <DataGrid style={
          { backgroundColor: `rgb(231,230,230) `, border: '1px solid white' }

        }
          rows={Rows}
          columns={columns}
          rowCount={100}
          paginationModel={firstPaginationModel}
          paginationMode="server"
          onPaginationModelChange={setfirstPaginationModel}

        />
        <br></br>
        <br></br>
        <DataGrid style={
          { backgroundColor: `rgb(231,230,230) `, border: '1px solid white' }
        }
          rows={Rows2}
          columns={columns}
          rowCount={100}
          paginationModel={secondPaginationModel}
          paginationMode="server"
          onPaginationModelChange={setsecondPaginationModel}
        />

      </Box>



      <div>

        {/* <Link onClick={handleClickOpen}>order-details</Link> */}
        <Dialog onClose={handleClose} fullWidth maxWidth={'md'} open={open} PaperProps={{ sx: { width: "80%", height: "80%", padding: '0', margin: '0' } }}>
          <OrderDetails onCloseO={handleClose} id={id} />
        </Dialog>
      </div>
    </div>


  );
}

export default PendingOrders;
















