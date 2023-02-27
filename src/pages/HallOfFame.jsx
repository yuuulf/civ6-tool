import AchievementModal from "../components/AchievementModal";
import { getLeaders } from "../scripts/leader";
import { getAchievements } from "../scripts/achievement";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, jaJP } from "@mui/x-data-grid";

export default function HallOfFame() {
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
      field: "score",
      headerName: "スコア",
      type: "number",
      width: 105,
      editable: false,
    },
    {
      field: "science",
      headerName: "科学",
      type: "number",
      width: 105,
      editable: false,
    },
    {
      field: "diplomacy",
      headerName: "外交",
      type: "number",
      width: 105,
      editable: false,
    },
    {
      field: "religion",
      headerName: "宗教",
      type: "number",
      width: 105,
      editable: false,
    },
    {
      field: "conquest",
      headerName: "制覇",
      type: "number",
      width: 105,
      editable: false,
    },
    {
      field: "culture",
      headerName: "文化",
      type: "number",
      width: 105,
      editable: false,
    },
    {
      field: "total",
      headerName: "合計",
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "add",
      headerName: "勝利",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <AchievementModal
          aria-label="add"
          leader={params.row}
          onClose={() => {
            setReload(reload + 1);
          }}
        />
      ),
    },
  ];

  const [rows, setRow] = useState([]);
  useEffect(() => {
    const f = async () => {
      const leaders = await getLeaders();
      const achievements = await getAchievements();
      const data = leaders.data.map((l) => {
        const achieve = achievements.data.filter((a) => a.leader === l.id);
        const achieveFilter = (achieve, victory) => {
          return achieve.filter((a) => a.achievement === victory).length;
        };
        l.score = achieveFilter(achieve, "スコア");
        l.science = achieveFilter(achieve, "科学");
        l.diplomacy = achieveFilter(achieve, "外交");
        l.religion = achieveFilter(achieve, "宗教");
        l.conquest = achieveFilter(achieve, "制覇");
        l.culture = achieveFilter(achieve, "文化");
        l.total = achieve.length;
        return l;
      });
      setRow(() => data);
    };
    f();
  }, [reload]);

  return (
    <>
      <div className="content">
        <h3>達成状況</h3>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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
            initialState={{
              filter: {
                filterModel: {
                  items: [
                    { columnField: "total", operatorValue: ">", value: "0" },
                  ],
                },
              },
            }}
            getCellClassName={(params) => {
              const v = [
                "score",
                "science",
                "diplomacy",
                "religion",
                "conquest",
                "culture",
                "total",
              ];
              if (v.includes(params.field) && params.value === 0) {
                return "no-victory";
              }
              return "";
            }}
          />
        </Box>
      </div>
    </>
  );
}
