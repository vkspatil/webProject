import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { logout } from "../../store/AuthSlice";
import OrderScreen from "../ordersModule/OrderScreen";
import Home from "../Pages/Home";
import Logout from "../Pages/Logout";
import DateTimeDisplay from "./DateTimeDisplay";
import MenuList from "./MenuList";

const drawerWidth = 125;

export default function Layout() {
  let loginInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [isOpenConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirm = () => {
    dispatch(logout());
    handleCloseDialog();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to right, #FFFFFF,#fcf6f2)",
      }}
    >
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#FFFFFF",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <div className="text-[#563621] text-xl">Clipped drawer</div>
          <div className="flex items-center space-x-4">
            {!isMobile && <DateTimeDisplay />}
            <div className="flex items-center space-x-2">
              <Avatar
                sx={{ bgcolor: "#563621", mr: 2, cursor: "pointer" }}
                alt="User Profile"
                onClick={handleClick}
              >
                <PersonIcon />
              </Avatar>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  mt: 1,
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    width: 200,
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#FFFFFF",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1, color: "#563621" }}>
                    {loginInfo?.userName}
                  </Typography>
                  <Divider sx={{ width: "100%", mb: 1 }} />
                  {isMobile && (
                    <Box sx={{ mb: 2 }}>
                      <DateTimeDisplay isMobile={isMobile} />
                    </Box>
                  )}
             
                </Box>
              </Popover>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#FFFFFF",
          },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar />
        <MenuList selectedMenu={selectedMenu} onClick={handleMenuItemClick} />
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            background: "#FFFFFF",
          },
        }}
      >
        <Toolbar />
        <MenuList selectedMenu={selectedMenu} onClick={handleMenuItemClick} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          background: "white",
        }}
      >
        <Routes>
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/home" element={<Home />} />
       
          <Route path="/logout" element={<Logout />} />
        </Routes>

      
      </Box>
    </Box>
  );
}
