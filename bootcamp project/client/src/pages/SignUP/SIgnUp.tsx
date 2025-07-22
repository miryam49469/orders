import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import {
  Box,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import SignUpForm from "./SignUpform";
import useStyles from "./signUp.styles";
import GlobalModalDialog from "../../components/globalModelDialog";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function SignUp({ onClose }: any) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <GlobalModalDialog
      isButton={false}
      title={"Set up your account"}
      img={"gifts.png"}
    > <div>
    <SignUpForm></SignUpForm>{" "}
    <h4>Fill in your details so you can log in later</h4>
  </div></GlobalModalDialog>
    /*        
     <DialogContent style={{ padding: '0' }}>
            <div style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                margin: '0',
                height: '100%'
            }}>
                <CssBaseline />
                <div style={{
                    width: '70%',
                    marginLeft: '100px'
                }} >
                    <h1> Set up your account</h1>
                    <SignUpForm></SignUpForm>
                </div>
                <div style={{
                    width: '30%',
                    height: '100%',
                    backgroundColor: 'rgb(228, 214, 214)',
                    textAlign: 'center',
                }}>
                    <img style={{
                        width: '90%',
                        height: '50%',
                        marginTop: '40%'
                    }}
                     src="gifts.png" alt="dsf" />
                     <h4 >Fill in your details so you can log in later</h4>
               </div>
            </div></DialogContent> 
     </> */
  );
}
