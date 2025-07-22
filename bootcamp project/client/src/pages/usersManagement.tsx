import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import GlobalTable from "../components/globalTable";
import { PALLETE } from '../config/config'
import { GridColDef, GridPreProcessEditCellProps, GridRowId, GridRowModel, GridRowsProp } from "@mui/x-data-grid/models";
import { TextField } from "@mui/material";
import { IUser } from "../types/IUser";
import LandingPage from "./landingPage";


const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern = /^[0-9]{7,15}$/;
const ROLE = sessionStorage.getItem('role');
const URL = `User`;
let TYPE = '';
const defineColumns = (editable: boolean) => {
  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Full Name', width: 180, editable: editable, disableColumnMenu: true },
    {
      field: 'password',
      headerName: 'password',
      type: 'string',
      width: 200,
      renderCell: (params) => (
        <TextField
          type="password"
          value={params.value}
        />
      ),
      align: 'left',
      headerAlign: 'left',
      editable: editable,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length < 8;
        return { ...params.props, error: hasError, message: "password not strong" };
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 200,
      editable: editable,
      disableColumnMenu: true,
      cellClassName: 'super-app-theme--header',
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !emailPattern.test(params.props.value);
        return { ...params.props, error: hasError, message: "email not valid" };
      }
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      editable: editable,
      type: 'string',
      disableColumnMenu: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value == "";
        return { ...params.props, error: hasError, message: "required" };
      }
    },
    {
      field: 'telephone',
      headerName: 'Phone',
      width: 200,
      editable: editable,
      type: 'string',
      disableColumnMenu: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !phonePattern.test(params.props.value);
        return { ...params.props, error: hasError, message: "phone not valid" };
      }
    },

  ];
  return columns;
}


const UsersManagement: React.FC = () => {


  const { getData, postData, putData, deleteData } = UseCrud();
  const [customers, setCustomers] = useState<GridRowsProp>([]);
  const [employees, setEmployees] = useState<GridRowsProp>([]);
  const [admins, setAdmins] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<GridRowsProp>([]);


  const getUsers = (role: string) => {

    getData(`${URL}/${role}/${page}`)
      .then((data) => {
        switch (role) {
          case 'ADMIN':
            setAdmins(data);
            break;
          case 'EMPLOYEE':
            setEmployees(data);
            break;
          case 'CUSTOMER':
            setCustomers(data);
            break;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getUsers('ADMIN');
    getUsers('EMPLOYEE');
    getUsers('CUSTOMER');
    
  }, []);

  useEffect(() => {
    getUsers(TYPE);
  }, [page]);



  const pageChange = (num: number, type: string) => {
    setPage(num);
    TYPE = type;
  }

  const addUser = (newUser: GridRowModel, type: string) => {
    newUser.role = type;
    postData(URL, newUser)
      .then((data) => {
        console.log(data);
        getUsers(type);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  const updateUser = (user: GridRowModel) => {
    console.log(user);
    putData(URL, user)
      .then((data) => {
        console.log(data);
        getUsers(user.role);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deleteUser = (id: GridRowId, type: string) => {
    deleteData(`${URL}/${id}`)
      .then((data) => {
        console.log(data);
        getUsers(type);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <>
    <LandingPage></LandingPage>
      {admins?.length >= 0 && <GlobalTable
        editable={ROLE === 'ADMIN' ? true : false}
        data={admins}
        title={"Administrators"}
        columns={defineColumns(ROLE === 'ADMIN' ? true : false)}
        color={PALLETE.RED}
        type={"ADMIN"}
        onRowAdded={addUser}
        onRowDeleted={deleteUser}
        onRowUptated={updateUser}
        role={'ADMIN'}
        fetchData={pageChange} rowsCount={100} pageSizeOption={4}></GlobalTable>}

      {employees?.length >= 0 && <GlobalTable
        editable={ROLE === 'ADMIN' ? true : false}
        data={employees}
        title={"Employees"}
        columns={defineColumns(ROLE === 'ADMIN' ? true : false)}
        color={PALLETE.YELLOW}
        type={"EMPLOYEE"}
        onRowAdded={addUser}
        onRowDeleted={deleteUser}
        onRowUptated={updateUser}
        role={'EMPLOYEE'}
        fetchData={pageChange} rowsCount={100} pageSizeOption={4}></GlobalTable>}

      {customers?.length >= 0 && <GlobalTable
        editable={ROLE !== 'CUSTOMER' ? true : false}
        data={customers}
        title={"Customers"}
        columns={defineColumns(ROLE !== 'CUSTOMER' ? true : false)}
        color={PALLETE.BLUE}
        type={"CUSTOMER"}
        onRowAdded={addUser}
        onRowDeleted={deleteUser}
        onRowUptated={updateUser}
        role={'CUSTOMER'}
        fetchData={pageChange} rowsCount={100} pageSizeOption={4}></GlobalTable>}
    </>
  );
};
export default UsersManagement;