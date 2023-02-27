import EditButton from "./EditButton";
import { getLeaders } from "../scripts/supabaseClient";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, jaJP } from "@mui/x-data-grid";

export default function Leaders() {
  return (
    <>
      <Box sx={{ width: "100%" }}>達成状況</Box>
    </>
  );
}
