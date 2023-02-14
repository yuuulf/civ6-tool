import TopBar from "../components/TopBar";
import EditButton from "../components/EditButton";
import { getCommands } from "../scripts/supabaseClient";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { right } from "@popperjs/core";
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

function Top() {
  const [reload, setReload] = useState(0);
  const columns: GridColDef[] = [
    {
      field: "category",
      headerName: "カテゴリー",
      width: 200,
      editable: false,
    },
    {
      field: "command",
      headerName: "テキストコマンド",
      width: 200,
      editable: false,
    },
    {
      field: "detail",
      headerName: "内容",
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
      const commands = await getCommands();
      setRow(() => commands.data);
    };
    f();
  }, [reload]);

  return (
    <>
      <TopBar />
      <div className="content">
        <Box sx={{ textAlign: right, marginBottom: 1 }}>
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
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
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

export default Top;
