import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
const i = 7;
const initialRows = [
  {
    sno: 1,
    id: 1,
    docname: "Snow",
    doclink: "Snow.com",
    result: "abcyy",
    action: "delete/modify",
  },
  {
    sno: 2,
    id: 2,
    docname: "Salt",
    doclink: "Salt.com",
    result: "abctt",
    action: "delete/modify",
  },
  {
    sno: 3,
    id: 3,
    docname: "Sia",
    doclink: "Sia.com",
    result: "abcee",
    action: "delete/modify",
  },
  {
    sno: 4,
    id: 4,
    docname: "Siq",
    doclink: "Siq.com",
    result: "abcqq",
    action: "delete/modify",
  },
  {
    sno: 5,
    id: 5,
    docname: "Siya",
    doclink: "Siya.com",
    result: "abcww",
    action: "delete/modify",
  },
  {
    sno: 6,
    id: 6,
    docname: "Seeva",
    doclink: "Seeva.com",
    result: "abcd",
    action: "delete/modify",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = i++;
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const columns = [
    { field: "sno", headerName: "S No.", width: 220 },
    { field: "id", headerName: "Doc Id", width: 220 },
    { field: "docname", headerName: "Doc Name", width: 220, editable: true },

    {
      field: "doclink",
      headerName: "Doc Link",
      width: 220,
      editable: true,
    },
    {
      field: "result",
      headerName: "Result",
      width: 220,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 220,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
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
      },
    },
  ];

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  return (
    <Grid container>
      <Grid md={12}>
        <Grid
          container
          padding={"5px"}
          paddingLeft={"20px"}
          paddingRight={"20px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
          <Grid item md={5}>
            <Grid container gap={1} alignItems={"center"}>
              <Grid item md={9}>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Query"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button variant="contained"> Search </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={5}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="keyword"
                  control={<Radio />}
                  label="Keyword"
                />
                <FormControlLabel
                  value="structure "
                  control={<Radio />}
                  label="Structure"
                />
                <FormControlLabel
                  value="unstructure"
                  control={<Radio />}
                  label="Unstructure"
                />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>{" "}
            </FormControl>{" "}
          </Grid>
        </Grid>
      </Grid>

      <Grid md={12}> </Grid>

      <Grid md={12}>
        <Item elevation={3} style={{ marginTop: "20px", padding: "20px" }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              style={{ flexDirection: "column-reverse" }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>{" "}
        </Item>{" "}
      </Grid>
    </Grid>
  );
}
