import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";

const setStatus = {
  0: "Open",
  1: "Ready",
  2: "Intransit",
  3: "Reached",
  4: "Delivered",
  5: "Completed",
};

const statusMap = {
  0: "primary",
  1: "secondary",
  2: "warning",
  3: "info",
  4: "error",
  5: "success",
};

export const OverviewLatestOrders = (props) => {
  const router = useRouter();
  const { orders = [], sx } = props;
  const [shipmentData, setShipmentData] = useState([]);
  const token = localStorage.getItem("token");
  const GetAllShipments = () => {
    axios({
      method: "GET",
      url: "https://localhost:7231/api/Shipment/GetLatestShipments",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setShipmentData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllShipments();
  }, []);

  return (
    <>
      {shipmentData.length <= 0 ? (
        <Alert severity="info">This is an info alert — check it out!</Alert>
      ) : (
        <>
          <Card sx={sx}>
            <CardHeader title="Latest Shipments" />
            <Scrollbar sx={{ flexGrow: 1 }}>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Tracking #</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell sortDirection="desc">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipmentData.map((order) => {
                      const createdAt = moment(order?.createdAt).format("D MMMM YYYY");

                      return (
                        <TableRow hover key={order.id}>
                          <TableCell>{setStatus[order.shipmentDetails.length]}</TableCell>
                          <TableCell>{order.trackingNumber}</TableCell>
                          <TableCell>{order.senderName}</TableCell>
                          <TableCell>{createdAt}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                color="inherit"
                endIcon={
                  <SvgIcon fontSize="small">
                    <ArrowRightIcon />
                  </SvgIcon>
                }
                size="small"
                variant="text"
                onClick={() => router.push("/shipments")}
                style={{ cursor: "pointer" }}
              >
                View all
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
