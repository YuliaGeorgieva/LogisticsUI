import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { title } from "process";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import axios from "axios";
import Swal from "sweetalert2";
const CustomModalEdit = ({
  ShowAllCustomer,
  editData,
  openmodal,
  HandleCloseModal,
  title,
  addCostumer,
  HandleSubmitCustomer,
  compamyBranchesData,
  shipmentsTitle,
  getAllShipemnts,
  GetAllEmployees,
  ShowAllCompanyBranches
}) => {
  const router = useRouter();
  const [editCustomerData, setEditCustomerData] = useState({
    email: "",
    //  password: "",
    name: "",
    branchId: 0,
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const { pathname } = router;
  const UserID = localStorage.getItem("user_id");
  const [UpdateompanyBranch, setUpdateCompanyBranch] = useState({
    id: 0,
    branchName: "",
    address: "",
    location: "",
    phoneNumber: "",
    companyId: "",
    isDeleted: false,
    addedBy: UserID,
  });

  const HandleCompanyBranchesData = (e) => {
    const SearchValues = e.target.value;
    setUpdateCompanyBranch({ ...UpdateompanyBranch, [e.target.name]: SearchValues });
  }
  const [shipmentdata, setShipmentData] = useState({
    trackingNumber: "n",
    shipmentStatusId: 0,
    message: "",
    shipmentId: "",
    addedBy: UserID,
  });

  useEffect(() => {
    setShipmentData({ ...shipmentdata, shipmentId: editData?.id });
  }, [editData]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setShipmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const ShipmentId = editData?.shipmentDetails?.shipmentId;
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to API
    HandleCloseModal();
    axios({
      method: "POST",
      url: "https://localhost:7231/api/Customers/UpdateCustomer",
      data: editCustomerData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          ShowAllCustomer();
          Swal.fire({
            icon: "success",
            title: "Customer updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
      });
  };
  const HandleEmployeeUpdate = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://localhost:7231/api/Employees/UpdateEmployee",
      data: editCustomerData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          HandleCloseModal();
          GetAllEmployees();
          Swal.fire({
            icon: "success",
            title: "Employee updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const HandleCustomerData = (e) => {
    const { name, value } = e.target;
    setEditCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (pathname === "/customers" || pathname === "/employees") {
      if (editData) {
        setEditCustomerData({
          email: editData?.email,
          name: editData?.name,
          branchId: 0,
          phoneNumber: editData?.phoneNumber,
          address: editData?.address,
          city: editData?.city,
          state: editData?.state,
          country: editData?.country,
        });
      }
    }
  }, [editData]);
  useEffect(() => {
    if (pathname === "/companyBranches" && compamyBranchesData) {
      // Update addCompanyBranch with values from compamyBranchesData
      setUpdateCompanyBranch({
        id: compamyBranchesData.id,
        branchName: compamyBranchesData.branchName,
        location: compamyBranchesData.location,
        phoneNumber: compamyBranchesData.phoneNumber,
        address: compamyBranchesData.address,
        companyId: compamyBranchesData.companyId,
        isDeleted: compamyBranchesData.isDeleted,
        addedBy: UpdateompanyBranch?.addedBy,
      });
    }
  }, [pathname, compamyBranchesData]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:7231/api/Company/GetAllCompanies",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setcompanyIdList(response.data);
    });
  }, []);

  const [companyIdList, setcompanyIdList] = useState([]);
  const [selectCompanyId, setSelectCompanyId] = useState("");
  const handleChange = (event) => {
    setSelectCompanyId(event.target.value);
  };

  const handleEditCompanyBranches = () => {
    axios({
      method: "PUT",
      url: "https://localhost:7231/api/CompanyBranch/UpdateCompanyBranch",
      data: {
        id: UpdateompanyBranch?.id,
        companyId: selectCompanyId,
        branchName: UpdateompanyBranch.branchName,
        address: UpdateompanyBranch.address,
        location: UpdateompanyBranch.location,
        phoneNumber: UpdateompanyBranch.phoneNumber,
        isDeleted: UpdateompanyBranch?.isDeleted,
        addedBy: UpdateompanyBranch?.addedBy,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          ShowAllCompanyBranches();
          HandleCloseModal();
          Swal.fire({
            icon: "success",
            title: "Company branch updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  useEffect(() => {
    if (pathname === "/shipments" && editData) {
      setShipmentData({
        shipmentStatusId: shipmentdata?.shipmentStatusId,
        message: editData?.message,
        shipmentId: editData?.id,
        addedBy: UserID,
        trackingNumber: "nulll",
      });
    }
  }, []);
  const ShipmentSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: "https://localhost:7231/api/Shipment/UpdateShipment",
      data: {
        shipmentStatusId: shipmentdata?.shipmentStatusId,
        message: shipmentdata?.message,
        shipmentId: shipmentdata?.shipmentId,
        addedBy: shipmentdata?.addedBy,
        trackingNumber: shipmentdata?.trackingNumber,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Shipment status updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          HandleCloseModal();
          setTimeout(() => {
            getAllShipemnts();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <Modal open={openmodal} onClose={HandleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          minWidth: 300,
          borderRadius: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: "800" }}>
              {pathname === "/companyBranches" ? (
                <> Update Company Branches</>
              ) : pathname === "/customers" ? (
                <> Update Customer</>
              ) : pathname === "/employees" ? (
                <> Update Employee</>
              ) : null}
            </span>
          </div>
          <div
            onClick={HandleCloseModal}
            style={{
              fontWeight: "800",
              fontSize: "18px",
              cursor: "pointer",
              padding: "5px 5px",
            }}
          >
            <span>X</span>
          </div>
        </div>
        <form>
          <Grid container spacing={2}>
            {pathname === "/customers" && (
              <>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    disabled
                    autoComplete="off"
                    name="email"
                    label="Email Address"
                    value={editCustomerData.email}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    disabled
                    type="password"
                    autoComplete="off"
                    name="password"
                    label="Password"
                    value={editCustomerData.password}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    label="Name"
                    value={editCustomerData.name}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="phoneNumber"
                    label="Phone Number"
                    value={editCustomerData.phoneNumber}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="address"
                    label="Address"
                    value={editCustomerData.address}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="city"
                    label="City"
                    value={editCustomerData.city}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="state"
                    label="State"
                    value={editCustomerData.state}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="country"
                    label="Country"
                    value={editCustomerData.country}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {/* Add other form fields similarly */}
              </>
            )}
          </Grid>
          <Grid container spacing={2}>
            {pathname === "/employees" && (
              <>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="email"
                    label="Email Address"
                    value={editCustomerData.email}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    type="password"
                    autoComplete="off"
                    name="password"
                    label="Password"
                    value={editCustomerData.password}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    label="Name"
                    value={editCustomerData.name}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="phoneNumber"
                    label="Phone Number"
                    value={editCustomerData.phoneNumber}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="address"
                    label="Address"
                    value={editCustomerData.address}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="city"
                    label="City"
                    value={editCustomerData.city}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="state"
                    label="State"
                    value={editCustomerData.state}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="country"
                    label="Country"
                    value={editCustomerData.country}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {/* Add other form fields similarly */}
              </>
            )}
            {pathname === "/companyBranches" && (
              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="branchName"
                    label="Branch Name"
                    placeholder="Branch Name"
                    value={UpdateompanyBranch?.branchName}
                    onChange={HandleCompanyBranchesData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                    <Select
                      placeholder="Select Company"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectCompanyId}
                      label="Select Company"
                      onChange={handleChange}
                    >
                      {companyIdList?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* </Box> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="address"
                    label="Address"
                    placeholder="Enter Address"
                    value={UpdateompanyBranch?.address}
                    onChange={HandleCompanyBranchesData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="location"
                    label="location"
                    placeholder="Enter Location"
                    value={UpdateompanyBranch?.location}
                    onChange={HandleCompanyBranchesData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="number"
                    autoComplete="off"
                    name="phoneNumber"
                    label=" Phone Number"
                    placeholder="Enter Phone Number"
                    value={UpdateompanyBranch?.phoneNumber}
                    onChange={HandleCompanyBranchesData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            )}
            {pathname === "/shipments" && (
              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6} lg={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Shipment Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="shipmentStatusId"
                      value={shipmentdata?.shipmentStatusId}
                      label="Shipments Status"
                      onChange={handleFieldChange}
                    >
                      <MenuItem value={0}>Open</MenuItem>
                      <MenuItem value={1}>Ready</MenuItem>
                      <MenuItem value={2}>In Transit</MenuItem>
                      <MenuItem value={3}>Reached</MenuItem>
                      <MenuItem value={4}>Delivered</MenuItem>
                      <MenuItem value={5}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <TextField
                    autoComplete="off"
                    name="message"
                    multiline
                    rows={5}
                    label="Message"
                    value={shipmentdata?.message}
                    onChange={handleFieldChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            )}
          </Grid>

          <div
            style={{ display: "flex", justifyContent: "end", padding: "8px", marginTop: "10px" }}
          >
            <div style={{ padding: "0px 3px" }}>
              <Button onClick={HandleCloseModal} type="submit" variant="outlined" color="primary">
                Cancel
              </Button>
            </div>
            {pathname === "/customers" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button onClick={(e) => handleSubmit(e)} variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            ) : (
              <></>
            )}
            {pathname === "/employees" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button
                  onClick={(e) => HandleEmployeeUpdate(e)}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : (
              <></>
            )}
            {pathname === "/companyBranches" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button
                  onClick={(e) => handleEditCompanyBranches(e)}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : (
              <></>
            )}
            {pathname === "/shipments" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button onClick={(e) => ShipmentSubmit(e)} variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomModalEdit;
