import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert } from "react-alert";
import CustomModalEdit from "src/components/EditModal";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import moment from "moment";
import ModalTracking from "src/components/common/Modal";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    getCoustumerdata,
    ShowAllCustomer,
    employeeData,
    GetAllEmployees,
    ShowAllCompanyBranches,
    getCompanyBranchesdata,
    HandleCompanyBranchesData,
    handleModalClose,
    selectCompanyId,
    handleChange,
    showAllShipments,
    getAllShipemnts,
    CompanyID,
  } = props;
  const [openmodal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [compamyBranchesData, setAddCompanyBranches] = useState([]);
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const HandleAlert = () => {
    alert.show("Deleted Successfully");
  };
  const HandleCloseModal = () => {
    setOpenModal(false);
  };
  const handleModalOpen = (data) => {
    setOpenModal(true);
    setEditData(data);
    setAddCompanyBranches(data);
  };
  const [trackingShipementData, setTrackingShipementData] = useState([]);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    setOpen(true);
    setTrackingShipementData(data);
  };
  const handleClose = () => setOpen(false);
  const [shipmentid, setShipmentId] = useState(null);
  const router = useRouter();
  const { pathname } = router;
  const HandleDelete = (id) => {
    if (pathname === "/customers") {
      axios({
        method: "POST",
        url: `https://localhost:7231/api/Customers/DeleteCustomer?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            ShowAllCustomer();
            Swal.fire({
              icon: "success",

              title: "Customer Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } else if (pathname === "/employees") {
      axios({
        method: "DELETE",
        url: `https://localhost:7231/api/Employees/DeleteEmployee?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Employee Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            GetAllEmployees();
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Employee Deleted Failed",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(err, "err");
        });
    } else if (pathname === "/companyBranches") {
      axios({
        method: "DELETE",
        url: `https://localhost:7231/api/CompanyBranch/DeleteCompanyBranchById/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            ShowAllCompanyBranches();
            Swal.fire({
              icon: "success",
              title: "Company Branch Deleted Successfully",
              showConfirmButton: false,
              timer: 5000,
            });
            setTimeout(() => {
              Swal.close();
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } else if (pathname === "/shipments") {
      axios({
        method: "DELETE",
        url: `https://localhost:7231/api/Shipment/DeleteShipmentById/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Shipment Deleted Successfully",
              showConfirmButton: false,
              timer: 4000,
            });
            setTimeout(() => {
              getAllShipemnts();
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  return (
    <>
      <ModalTracking
        trackingShipementData={trackingShipementData}
        open={open}
        handleClose={handleClose}
      />
      <CustomModalEdit
        ShowAllCompanyBranches={ShowAllCompanyBranches}
        GetAllEmployees={GetAllEmployees}
        getAllShipemnts={getAllShipemnts}
        handleChange={handleChange}
        selectCompanyId={selectCompanyId}
        HandleCompanyBranchesData={HandleCompanyBranchesData}
        compamyBranchesData={compamyBranchesData}
        ShowAllCustomer={ShowAllCustomer}
        shipmentsTitle={"shipmentsTitle"}
        title="Update Customer"
        editData={editData}
        openmodal={openmodal}
        HandleCloseModal={HandleCloseModal}
      />
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            { }
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {pathname === "/companyBranches"
                      ? "Branch Name"
                      : pathname === "/shipments"
                        ? " sender Name"
                        : "Name"}
                  </TableCell>
                  <TableCell>
                    {pathname === "/shipments" ? "Tracking Number" : " Location"}
                  </TableCell>
                  <TableCell>
                    {pathname === "/shipments" ? "Receiver's Name" : " Phone Number"}
                  </TableCell>
                  <TableCell> {pathname === "/shipments" ? "Estimated Date" : "Address"}</TableCell>
                  <TableCell>{pathname === "/shipments" ? "Paid Amount"
                    : pathname === "/customers"
                    ? "Country"
                    : pathname === "/employees"
                    ? "Country"
                   : "Added On"} </TableCell>
                  {CompanyID ? null : <TableCell>Actions</TableCell>}

                </TableRow>
              </TableHead>
              <TableBody>
              {pathname === "/customers" ? (
                  <>
                    {getCoustumerdata?.map((customer) => {
                      const isSelected = selected.includes(customer?.id);
                      return (
                        <TableRow hover key={customer?.id} selected={isSelected}>

                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">{customer?.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{customer?.email}</TableCell>
                          <TableCell>{customer?.phoneNumber}</TableCell>
                          <TableCell>
                            {customer?.city}, {customer?.state}
                          </TableCell>
                          <TableCell>
                          {customer?.country}
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ display: "flex" }}>
                              <span
                                onClick={() => handleModalOpen(customer)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <BorderColorOutlinedIcon color="primary" />
                              </span>
                              <span
                                onClick={() => HandleDelete(customer?.id)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <DeleteOutlineIcon color="error" />
                              </span>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ) : pathname === "/employees" ? (
                  <>
                    {employeeData?.map((employee) => {
                      const isSelected = selected.includes(employee?.id);
                      // const createdAt = format(employee.createdAt, 'dd/MM/yyyy');
                      return (
                        <TableRow hover key={employee?.id} selected={isSelected}>

                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">{employee?.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{employee?.email}</TableCell>
                          <TableCell>{employee?.phoneNumber}</TableCell>
                          <TableCell>
                            {employee?.city}, {employee?.state}
                          </TableCell>
                          <TableCell>
                          {employee?.country}
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ display: "flex" }}>
                              <span
                                onClick={() => handleModalOpen(employee)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <BorderColorOutlinedIcon color="primary" />
                              </span>
                              <span
                                onClick={() => HandleDelete(employee?.id)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <DeleteOutlineIcon color="error" />
                              </span>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ) : pathname === "/companyBranches" ? (
                  <>
                    {getCompanyBranchesdata?.map((branches) => {
                      const formattedDate = moment(branches?.addedDate).format("D MMMM YYYY");

                      return (
                        <TableRow
                          hover
                          key={branches.id}
                        // selected={isSelected}
                        >

                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">{branches.branchName}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{branches.location}</TableCell>
                          <TableCell>{branches.phoneNumber}</TableCell>
                          <TableCell>{branches.address}</TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          {CompanyID ? null : <TableCell>
                            <Typography sx={{ display: "flex" }}>
                              <span
                                onClick={() => handleModalOpen(branches)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <BorderColorOutlinedIcon color="primary" />
                              </span>
                              <span
                                onClick={() => HandleDelete(branches?.id)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <DeleteOutlineIcon color="error" />
                              </span>
                            </Typography>
                          </TableCell>}

                        </TableRow>
                      );
                    })}
                  </>
                ) : pathname === "/shipments" ? (
                  <>
                    {showAllShipments?.map((branches) => {
                      const estimatedDeliveryDate = moment(branches?.estimatedDeliveryDate).format("D MMMM YYYY");
                      console.log(branches);
                      return (
                        <TableRow
                          hover
                          key={branches.id}
                        // selected={isSelected}
                        >
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">{branches.senderName}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{branches?.trackingNumber}</TableCell>
                          <TableCell>{branches.receiverName}</TableCell>
                          <TableCell>{estimatedDeliveryDate}</TableCell>
                          <TableCell>{branches?.finalPrice}</TableCell>
                          <TableCell>
                            <Typography sx={{ display: "flex" }}>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </span>
                              <span
                                onClick={() => handleOpen(branches)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <RemoveRedEyeIcon color="primary" />
                              </span>
                              <span
                                onClick={() => handleModalOpen(branches)}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <BorderColorOutlinedIcon color="primary" />
                              </span>
                              <span
                                onClick={() => {
                                  HandleDelete(branches?.id);
                                  setShipmentId(branches?.shipmentDetails?.shipmentId);
                                }}
                                style={{ padding: "0px 5px", cursor: "pointer" }}
                              >
                                <DeleteOutlineIcon color="error" />
                              </span>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ) : null}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
