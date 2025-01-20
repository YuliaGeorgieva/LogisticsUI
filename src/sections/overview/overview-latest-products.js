import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const router = useRouter();

  const [customerData, setCustomerData] = useState([]);
  const token = localStorage.getItem("token");
  const GetAllCustomers = () => {
    axios({
      method: "GET",
      url: "https://localhost:7231/api/Customers/GetCustomers",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setCustomerData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllCustomers();
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Customers" />
      <List>
        {customerData.map((customer, index) => {
          const hasDivider = index < customerData.length - 1;
          return (
            <ListItem divider={hasDivider} key={index}>
              <ListItemText
                primary={customer.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`${customer.email}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          );
        })}
      </List>
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
          onClick={() => router.push("/customers")}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  customerData: PropTypes.array,
  sx: PropTypes.object,
};
