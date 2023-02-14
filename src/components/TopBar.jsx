import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

function TopBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Tools
        </Typography>
        <Box components="span" sx={{ flex: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
