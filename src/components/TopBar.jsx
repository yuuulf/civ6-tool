import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

const settings = [
  { key: "leaderMaster", value: "指導者マスタ" },
  { key: "logout", value: "ログアウト" },
];

export default function TopBar(props) {
  const user = props?.user;
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const toLeaderMaster = useCallback(
    () => navigate("/leader-master", { replace: true }),
    [navigate]
  );

  const handleClickUserMenu = (event) => {
    if (event === "logout") {
      props.logout();
    }
    if (event === "leaderMaster") {
      toLeaderMaster();
    }
    setAnchorElUser(null);
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" noWrap>
          <Link href="/" underline="none" color="inherit">
            Tools
          </Link>
        </Typography>
        <Box components="span" sx={{ flex: 1 }} />

        {user ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user?.user_metadata?.avatar_url}
                  referrerPolicy="no-referrer"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.key}
                  onClick={() => handleClickUserMenu(setting.key)}
                >
                  <Typography textAlign="center">{setting.value}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}
