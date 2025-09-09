import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function GlobalPopOver(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { name, Pop ,image,filterTables} = props;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        style={{
          backgroundColor: ` rgb(235,159,110)`,
          color: `white`,
         }}      >
        <img src={image} style={{ height: "2vh" }} /> {name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }} style={{margin:"none"}}>
          <Pop filterTables={filterTables}></Pop>
        </Typography>
      </Popover>
    </div>
  );
}
