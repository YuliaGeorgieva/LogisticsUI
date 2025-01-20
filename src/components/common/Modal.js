import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import {
  Avatar,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import moment from "moment";
const ModalTracking = ({ handleClose, open, trackingOrderData, trackingShipementData }) => {

  const setStatus = {
    0: "Open",
    1: "Ready",
    2: "Intransit",
    3: "Reached",
    4: "Delivered",
    5: "Completed",
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };
  const columns = [
    { id: "Tracking Number", label: "Tracking Number", minWidth: 100 },
    { id: "Message", label: "Message", minWidth: 170 },
    { id: "Effected Date", label: "Effected Date", minWidth: 170 },
    { id: "Status", label: "Status", minWidth: 170 },
  ];

  const data = [
    {
      id: 1,
      // avatar: <Avatar src="avatar_url_1.jpg" />,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      // avatar: <Avatar src="avatar_url_2.jpg" />,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    // Add more data rows as needed
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 500,
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography marginBottom={3} id="transition-modal-title" variant="h5" component="h2">
              Tracking Shipment
            </Typography>
            <Box display="flex" justifyContent={"space-between"}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Sender Name
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.senderName || trackingOrderData?.senderName}
                </span>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Quantity
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.quantity ? trackingShipementData?.quantity : "-"}{" "}
                  {trackingOrderData?.quantity ? trackingOrderData?.quantity : "-"}
                </span>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Weight
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.weight || trackingOrderData?.weight}
                </span>
              </Box>
            </Box>
            <Box display="flex" justifyContent={"space-between"}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Discount
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.discount == 0
                    ? trackingShipementData?.discount
                    : "-" || trackingOrderData?.discount == 0
                    ? trackingOrderData?.discount
                    : "-"}
                </span>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Paid Amount
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.paidAmount === 0
                    ? trackingShipementData?.paidAmount
                    : "-" || trackingOrderData?.paidAmount === 0
                    ? trackingOrderData?.paidAmount
                    : "-"}
                </span>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Final Price
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.finalPrice === 0
                    ? trackingShipementData?.finalPrice
                    : "-" || trackingOrderData?.finalPrice === 0
                    ? trackingOrderData?.finalPrice
                    : "-"}
                </span>
              </Box>
            </Box>
            <Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  sx={{ fontWeight: "600" }}
                  marginBottom={3}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Description
                </Typography>
                <span style={{ paddingTop: "5px", fontWeight: "200" }}>
                  {trackingShipementData?.description || trackingOrderData?.description}
                </span>
              </Box>
            </Box>
            <hr />
            <Typography marginBottom={3} id="transition-modal-title" variant="h5" component="h2">
              Shipment Status Report
            </Typography>
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Typography sx={{ fontWeight: "600" }}>{column.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trackingShipementData?.shipmentDetails?.length !== 0 ||
                  trackingOrderData?.shipmentDetails?.length !== 0 ? (
                    <>
                      {trackingShipementData?.shipmentDetails
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const formattedDate = moment(row?.addedDate).format("D MMMM YYYY");
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
                      {trackingOrderData?.shipmentDetails
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const formattedDate = moment(row?.addedDate).format("D MMMM YYYY");
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
                    </>
                  ) : null}
                </TableBody>
              </Table>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTracking;
