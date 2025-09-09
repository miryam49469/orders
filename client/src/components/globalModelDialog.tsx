import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { Link, Button, DialogTitle, DialogContent } from "@mui/material";
import {
  DetailsDiv,
  GiftImg,
  OpenDialog,
  BackImg,
  TextSide,
} from "./globalModelDialog.style";
import { PALLETE } from "../config/config";

const GlobalModelDialog = (props: any) => {
  const [open, setOpen] = React.useState(false);
 
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  return (
    <DialogContent sx={{ p: 0, height: "42rem" }}>
      <DetailsDiv>
        <DialogTitle sx={{ fontSize: 35, pl: "3rem", fontWeight: "bold" }}>
          {props.title}
        </DialogTitle>
        <DialogContent style={{ paddingLeft: "2rem" }}>
          {props.children}
        </DialogContent>
      </DetailsDiv>
      <BackImg>
        <GiftImg src={props.img} alt={props.img}></GiftImg>
        <TextSide>{props.txtSide}</TextSide>
      </BackImg>
    </DialogContent>
  );
};

export default GlobalModelDialog;
