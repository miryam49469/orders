import { useEffect } from "react";
import GlobalModelDialog from "./globalModelDialog";
import { Button, Dialog } from "@mui/material";
import { PALLETE } from "../config/config";
import { Height } from "@mui/icons-material";

const GlobalErorrModel = (props: any) => {
  interface GlobalErorrModalProps {
    onClose: () => void;
  }
  const handleClickClose = () => {
    props.onClose();
  };
  useEffect(() => {}, []);
  return (
    <Dialog open={true} fullWidth sx={{ maxHeight: "60vh", top: "13vh" }}>
      <GlobalModelDialog
        title={"Erorr"}
        img={"error.svg"}
      > <div>
      <Button
        style={{
          zIndex: 3,
          position: "absolute",
          backgroundColor: PALLETE.ORANGE,
          borderRadius: "10px",
          top: "45vh",
          right: "4vw",
          color: "black",
        }}
        onClick={handleClickClose}
      >
        close
      </Button>
      <h2>
        unexpected error
        <br /> please try again later
        <br />
        or contact our support team at:
        <br />
        support@myapp.com
      </h2>
    </div></GlobalModelDialog>
    </Dialog>
  );
};

export default GlobalErorrModel;
