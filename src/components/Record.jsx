import EditButton from "./EditButton";
import { getLeaders } from "../scripts/supabaseClient";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, jaJP } from "@mui/x-data-grid";

export default function Record() {
  return (
    <>
      <Box sx={{ width: "100%" }}>記録</Box>
    </>
  );
}
