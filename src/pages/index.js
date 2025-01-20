import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import SendIcon from "@mui/icons-material/Send";
import { Button, Card, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["Dashboard"];
const settings = ["Dashboard", "Logout"];

import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";

const Companies = () => {
  const [showtrackingTable, setshowtrackingTable] = useState(false);
  const [trackingOrderData, setTrackingOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  //const UserId = localStorage.getItem("user_id");
  const executeOperation = (selectedMenu) => {
    if (selectedMenu === "Logout") {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");

      router.push("/auth/login");
    } else if (selectedMenu === "Dashboard") {
      router.push("/dashboard");
    }
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const token = localStorage.getItem("token");
  const user_name = localStorage.getItem("user_name");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios({
        method: "GET",
        url: `https://localhost:7231/api/Shipment/TrackShipment/${searchTerm}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setTrackingOrderData(response.data);
            setshowtrackingTable(true);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = (e) => {
    const SearchValue = e.target.value;
    setSearchTerm(SearchValue);
    if (SearchValue) {
      setshowtrackingTable(false);
    }
  };

  const columns = [
    { id: "Tracking Number", label: "Tracking Number", minWidth: 100 },
    { id: "Message", label: "Message", minWidth: 170 },
    { id: "Effected Date", label: "Effected Date", minWidth: 170 },
    { id: "Status", label: "Status", minWidth: 100 },
  ];
  const setStatus = {
    0: "Open",
    1: "Ready",
    2: "Intransit",
    3: "Reached",
    4: "Delivered",
    5: "Completed",
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Logistics
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => router.push("/dashboard")}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Logistics
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => router.push("/dashboard")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Show Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user_name} src="/static/images/avatar/2.jpg" />
                  <MenuItem>
                    <Typography textAlign="center" sx={{ color: "white" }}>
                      {user_name}
                    </Typography>
                  </MenuItem>
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => executeOperation(setting)}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button onClick={() => router.push("/auth/login")} variant="contained">
                Sign In
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h2" component="h3" style={{ textAlign: "center" }}>
            TRACK & TRACE
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center" }}>
            Track Your Shipment
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center" }}>
            Enter any combination of tracking Reference number.
          </Typography>
        </Box>

        <Box
          style={{
            width: "50%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            onChange={(e) => handleSearch(e)}
            sx={{
              marginTop: "30px !important",
            }}
            fullWidth
            label="Enter your tracking number"
            placeholder="0000000000"
          />
        </Box>

        <Box
          style={{
            width: "50%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              marginTop: "20px !important",
            }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Track Shipment
          </Button>
        </Box>

        {showtrackingTable ? (
          <>
            <Typography marginBottom={3} id="transition-modal-title" variant="h5" component="h2">
              Tracking Shipment
            </Typography>

            <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Tracking No : {trackingOrderData.trackingNumber}
                </Grid>
                <Grid item xs={4}>
                  Origin: {trackingOrderData?.senderAddress}
                </Grid>
                <Grid item xs={4}>
                  Destination: {trackingOrderData?.receiverAddress}
                </Grid>
                <Grid item xs={4}>
                  Weight: {trackingOrderData?.weight}
                </Grid>
                <Grid item xs={4}>
                  Quantity: {trackingOrderData?.quantity}
                </Grid>
              </Grid>
            </Box>
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Typography variant="subtitle1">{column.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trackingOrderData?.shipmentDetails
                    ?.slice() // Create a shallow copy of the array to avoid mutating the original data
                    .sort((a, b) => moment(b?.addedDate).valueOf() - moment(a?.addedDate).valueOf()) // Sort by descending date
                    .map((row) => {
                      const formattedDate = moment(row?.addedDate).format("D MMMM YYYY hh:mm A");
                      const shpmentStatus = setStatus[row.shipmentStatusId];
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{row.trackingNumber}</TableCell>
                          <TableCell>{row.message}</TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>{shpmentStatus}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Card>
          </>
        ) : (
          <></>
        )}
        <div
          style={{
            backgroundColor: "#6366F1",
            color: "white",
            position: "fixed",
            left: "0",
            bottom: "0",
            width: "100%",
          }}
        >
          <h4
            style={{
              paddingLeft: "12px",
              textAlign: "center",
            }}
          >
            © copyright 2023
          </h4>
        </div>
      </Container>
    </div>
  );
};

export default Companies;
