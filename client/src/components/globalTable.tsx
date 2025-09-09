import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridPaginationModel,
  GridFeatureMode,
  GridEditInputCell,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useEffect } from "react";
import { Snackbar } from "@mui/base";
import { Alert, AlertProps } from "@mui/material";
import { log } from "console";
interface TableProp {
  editable?: boolean;
  data: GridRowsProp;
  title: string;
  color: string;
  columns: GridColDef[];
  type: string;
  onRowUptated?: (user: GridRowModel) => void;
  onRowDeleted?: (id: GridRowId, type: string) => void;
  onRowAdded?: (newUser: GridRowModel, type: string) => void;
  fetchData?: (num: number, type: string) => void;
  role: string;
  rowsCount: number;
  pageSizeOption: number;
}
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
const GlobalTable: React.FC<TableProp> = ({
  editable,
  data,
  title,
  columns,
  color,
  type,
  onRowAdded,
  onRowDeleted,
  onRowUptated,
  role,
  fetchData,
  rowsCount,
  pageSizeOption,
}) => {
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        {
          id,
          fullName: "",
          password: "",
          email: "",
          address: "",
          telephone: "",
          role: "",
          isNew: true,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
      }));
    };
    if (editable)
      return (
        <GridToolbarContainer>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClick}
            style={{ color: color }}
          >
            Add {type}
          </Button>
        </GridToolbarContainer>
      );
    else return <></>;
  }
  const [rows, setRows] = React.useState(data);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: pageSizeOption });
  useEffect(() => {
    if (fetchData) fetchData(paginationModel.page, type);
  }, [paginationModel]);
  useEffect(() => {
    setRows(data);
  }, [data]);
  useEffect(() => {
    console.log(data);
  }, []);
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleDeleteClick = (id: GridRowId) => () => {
    if (onRowDeleted) {
      onRowDeleted(id, type);
    }
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    if (newRow?.isNew) {
      if (onRowAdded) onRowAdded(newRow, type);
    } else {
      if (onRowUptated) {
        onRowUptated(newRow);
      }
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: color,
      color: "white",
    },
  }));
  function NameEditInputCell(props: GridRenderEditCellParams) {
    return (
      <StyledTooltip open={!!props.error} title={props.message}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
  }
  function validation(params: GridRenderEditCellParams) {
    return <NameEditInputCell {...params} />;
  }
  columns.map((c: any) => {
    if (c.preProcessEditCellProps) c.renderEditCell = validation;
  });
  const column: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: editable ? "Actions" : "",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode && editable) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        if (editable) {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        } else {
          return [<></>];
        }
      },
    },
  ];
  return (
    <Box
      sx={{
        height: "30%",
        marginLeft: "10%",
        width: "80%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <ArrowCircleDownIcon
        style={{ color: color, paddingLeft: "7px" }}
      ></ArrowCircleDownIcon>
      <span style={{ color: color, padding: "7px", verticalAlign: "super" }}>
        {title}
      </span>
      <DataGrid
        style={{ backgroundColor: `rgb(231,230,230) ` }}
        rows={rows}
        rowCount={rowsCount}
        columns={columns.concat(column)}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        disableColumnSelector
        disableRowSelectionOnClick
        pageSizeOptions={[pageSizeOption]}
        paginationModel={paginationModel}
        paginationMode={'server'}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};
export default GlobalTable;