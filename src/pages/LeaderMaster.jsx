import EditButton from "../components/EditButton";
import { getLeaders } from "../scripts/leader";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, jaJP } from "@mui/x-data-grid";

const renderDetail = (params) => {
  return (
    <Box
      style={{
        padding: 5,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {params.row.detail}
    </Box>
  );
};

export default function LeaderMaster() {
  const [reload, setReload] = useState(0);
  const columns: GridColDef[] = [
    {
      field: "country",
      headerName: "国",
      width: 200,
      editable: false,
    },
    {
      field: "name",
      headerName: "指導者",
      width: 300,
      editable: false,
    },
    {
      field: "detail",
      headerName: "詳細",
      flex: 1,
      editable: false,
      renderCell: renderDetail,
    },
    {
      field: "id",
      headerName: "編集",
      width: 50,
      editable: false,
      renderCell: (params) => (
        <EditButton
          item={params}
          onClose={() => {
            console.log("re");
            setReload(reload + 1);
          }}
        />
      ),
    },
  ];

  const [rows, setRow] = useState([]);
  useEffect(() => {
    const f = async () => {
      const d = await getLeaders();
      setRow(() => d.data);
    };
    f();
  }, [reload]);

  return (
    <>
      <div className="content">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <h3>指導者マスタ</h3>
          <EditButton
            item={null}
            onClose={() => {
              setReload(reload + 1);
            }}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowId={(rows) => rows.id}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[30]}
            experimentalFeatures={{ newEditingApi: true }}
            autoHeight
            disableColumnSelector
            disableExtendRowFullWidth
            disableSelectionOnClick
            getRowHeight={() => "auto"}
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          />
        </Box>
      </div>
    </>
  );
}
