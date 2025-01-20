import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
export const CompanyCard = (props) => {
  const HandleDeleteCompany = (id) => {
    if (id) {
      axios({
        method: "DELETE",
        url: `https://localhost:7231/api/Company/DeleteCompanyById/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            props.HandleGetCompany();
            Swal.fire({
              icon: "success",
              title: "Company Deleted Successfully",
              showConfirmButton: false,
              timer: 3000,
            });
            setTimeout(() => {
              Swal.close();
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };
  const { company } = props;
  const formattedDate = moment(company?.addedDate).format("D MMMM YYYY");
  const router = useRouter();

  const HandleNavigate = (id) => {
    console.log(id, "id");
    if (id) {
      router.push({
        pathname: "/companyBranches",
        query: { data: JSON.stringify(id) },
      });
    }
  }
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        onClick={() => HandleDeleteCompany(company?.id)}
        style={{ display: "flex", justifyContent: "end", padding: "10px 15px", cursor: "pointer" }}
      >
        <Tooltip title="Delete">
          <DeleteOutlineIcon color="error" />
        </Tooltip>
      </div>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <svg
            style={{ width: "40px", height: "40px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-2 h-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>
        </Box>
        <Typography align="center" gutterBottom>
          <div>
            <span style={{ fontWeight: "600" }}> Company Name :</span>
            <span> {company?.name}</span>
          </div>
        </Typography>
        <Typography align="center" variant="body1">
          <div>
            <span style={{ fontWeight: "600" }}>Company Address :</span>
            <span> {company.address}</span>
          </div>
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {formattedDate}
          </Typography>
        </Stack>
        <Stack sx={{ cursor: "pointer" }} alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
          </SvgIcon>
          <Typography
            onClick={() => HandleNavigate(company?.id)}
            className="cursor-pointer"
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            View Branches
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
