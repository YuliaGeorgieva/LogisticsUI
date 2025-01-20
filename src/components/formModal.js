import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Grid } from "@mui/material";
import { title } from "process";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const CustomModal = ({
  handleCourierChange,
  getEmployees,
  HandleAddSubmit,
  handeShipmentData,
  HandleSubmitCompanyBranchesData,
  selectCompanyId,
  companyIdList,
  handleChange,
  ShowAllCompanyBranches,
  ShipmentData,
  ShowAllCustomer,
  createCompanyBranch,
  handleAddEmployee,
  addEmployee,
  open,
  onClose,
  title,
  HandleCustomerData,
  addCostumer,
  HandleCompanyBranchesData,
  HandleSubmitCustomer,
  handleEmployeeEmail,
  handleCompany,
  HandleSubmitCompany,
  addCompanyBranch,
  showCompanyName,
  setShowCompanyName,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { pathname } = router;
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [buttonDisable, setbuttonDisable] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to API
    onClose(); // Close the modal after submission
  };
  useEffect(() => {
    if (addCostumer?.email === "" || addCostumer?.password === "" || addCostumer?.name === "") {
      setbuttonDisable(true)
    } else if (addCostumer?.email !== "" || addCostumer?.password !== "" || addCostumer?.name !== "") {
      setbuttonDisable(false)
    }
  }, [addCostumer])
  useEffect(() => {
    if (addEmployee?.email === "" || addEmployee?.password === "" || addEmployee?.name === "") {
      setbuttonDisable(true)
    } else if (addEmployee?.email !== "" || addEmployee?.password !== "" || addEmployee?.name !== "") {
      setbuttonDisable(false)
    }
  }, [addEmployee])
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={pathname === "/shipments" ? `modal-Height` : null}
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
            <span style={{ fontWeight: "800" }}>{title}</span>
          </div>
          <div
            onClick={onClose}
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
            {pathname === "/customers" ? (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    autoComplete="off"
                    tabIndex={0}
                    name="email"
                    label="Email Address"
                    value={addCostumer.email}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="password"
                    autoComplete="off"
                    name="password"
                    label="Password"
                    value={addCostumer.password}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    label="Name"
                    value={addCostumer.name}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="number"
                    autoComplete="off"
                    name="phoneNumber"
                    label="Phone Number"
                    value={addCostumer.phoneNumber}
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
                    value={addCostumer.address}
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
                    value={addCostumer.city}
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
                    value={addCostumer.state}
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
                    value={addCostumer.country}
                    onChange={HandleCustomerData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {/* Add other form fields similarly */}
              </>
            ) : pathname === "/employees" ? (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="email"
                    label="Email Address"
                    value={addEmployee.email}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="password"
                    autoComplete="off"
                    name="password"
                    label="Password"
                    value={addEmployee.password}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    label="Name"
                    value={addEmployee.name}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="phoneNumber"
                    label="Phone Number"
                    value={addEmployee.phoneNumber}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="address"
                    label="Address"
                    value={addEmployee.address}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="city"
                    label="City"
                    value={addEmployee.city}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="state"
                    label="State"
                    value={addEmployee.state}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="country"
                    label="Country"
                    value={addEmployee.country}
                    onChange={handleEmployeeEmail}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                {/* Add other form fields similarly */}
              </>
            ) : pathname === "/companies" ? (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="companyName"
                    label="Company Name"
                    value={createCompanyBranch?.companyName}
                    onChange={handleCompany}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    autoComplete="off"
                    name="address"
                    label="Address"
                    value={createCompanyBranch?.address}
                    onChange={handleCompany}
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                {/* Add other form fields similarly */}
              </>
            ) : pathname === "/shipments" ? (
              <div style={{ padding: "15px" }} className="scroll-modal">
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <h4>Sender Details</h4>
                  <h4>Receiver Details</h4>
                </div>
                <Grid container spacing={2}>
                  {/* Sender Inputs */}
                  <Grid container spacing={2} lg={6} sx={{ ml: 1, mr: 1 }}>
                    {/* First Column */}
                    <Grid item xs={12} sm={6} md={3} lg={5}>
                      <TextField
                        autoComplete="off"
                        name="senderName"
                        label="Sender's Name"
                        value={ShipmentData?.senderName}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="senderEmail"
                        label="Sender's Email"
                        value={ShipmentData?.senderEmail}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="senderAddress"
                        label="Sender's Address"
                        value={ShipmentData?.senderAddress}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        type="number"
                        autoComplete="off"
                        name="senderPhoneNumber"
                        label="Sender's Phone Number"
                        value={ShipmentData?.senderPhoneNumber}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={5}>
                      {/* <TextField
                          autoComplete='off'
                          name="senderState"
                          label="Sender's State "
                          value={ShipmentData?.senderState}
                          onChange={handeShipmentData}
                          fullWidth
                          margin="normal"
                        /> */}
                      <TextField
                        autoComplete="off"
                        name="senderCountry"
                        label="Sender's Country "
                        value={ShipmentData?.senderCountry}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="senderState"
                        label="Sender's State "
                        value={ShipmentData?.senderState}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="senderCity"
                        label="Sender's City "
                        value={ShipmentData?.senderCity}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      {/* <TextField
                          autoComplete='off'
                          name="senderCity"
                          label="Sender's City"
                          value={ShipmentData?.senderCity}
                          onChange={handeShipmentData}
                          fullWidth
                          margin="normal"
                        /> */}
                      {/* <TextField
                          autoComplete='off'
                          name="senderState"
                          label="Sender's State"
                          value={ShipmentData?.senderState}
                          onChange={handeShipmentData}
                          fullWidth
                          margin="normal"
                        /> */}
                      {/* Add other sender inputs here */}
                    </Grid>
                  </Grid>

                  {/* Receiver Inputs */}
                  <Grid container spacing={2} lg={6}>
                    <Grid item xs={12} sm={6} md={3} lg={5}>
                      <TextField
                        autoComplete="off"
                        name="receiverName"
                        label="Receiver's Name"
                        value={ShipmentData?.receiverName}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="receiverEmail"
                        label="Receiver's Email"
                        value={ShipmentData?.receiverEmail}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="receiverAddress"
                        label="Receiver's Address"
                        value={ShipmentData?.receiverAddress}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="receiverCity"
                        label="Receiver's City"
                        value={ShipmentData?.receiverCity}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={5}>
                      {/* <TextField
                          autoComplete='off'
                          name="receiverCountry"
                          label="Receiver's Country"
                          value={ShipmentData?.description}
                          onChange={handeShipmentData}
                          fullWidth
                          margin="normal"
                        /> */}
                      <TextField
                        autoComplete="off"
                        name="receiverCountry"
                        label="Receiver's Country"
                        value={ShipmentData?.description}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        autoComplete="off"
                        name="receiverState"
                        label="Receiver's State"
                        value={ShipmentData?.receiverState}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />

                      <TextField
                        autoComplete="off"
                        type="number"
                        name="receiverPhoneNumber"
                        label="Receiver's Phone Number"
                        value={ShipmentData?.receiverPhoneNumber}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <div style={{ display: "flex", marginLeft: "20px", justifyContent: "center" }}>
                    <h4>Product Information</h4>
                  </div>
                  <div style={{ display: "flex", marginLeft: "20px", justifyContent: "center" }}>
                    <Grid item xs={12} md={6} lg={12} style={{ width: "600px" }}>
                      <TextField
                        multiline
                        autoComplete="off"
                        name="description"
                        label=" Description"
                        value={ShipmentData?.description}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={12} sx={{ mt: 2, ml: 2, mr: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Courier</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectCompanyId}
                          onChange={handleCourierChange}
                        >
                          {getEmployees?.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 2, mr: 2 }}>
                      <TextField
                        autoComplete="off"
                        name="weight"
                        label=" Weight"
                        value={ShipmentData?.weight}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 1, mr: 1 }}>
                      <TextField
                        autoComplete="off"
                        name="finalPrice"
                        label="FinalPrice"
                        value={ShipmentData?.finalPrice}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </div>
                  <div style={{ display: "flex", marginLeft: "20px", justifyContent: "center" }}>
                    <Grid item xs={12} md={6} lg={12} style={{ width: "600px" }}>
                      <TextField
                        autoComplete="off"
                        name="discount"
                        label=" Discount"
                        value={ShipmentData?.discount}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 2, mr: 2 }}>
                      <TextField
                        autoComplete="off"
                        name="shippingAddress"
                        label=" Shipping Address"
                        value={ShipmentData?.shippingAddress}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 2, mr: 2 }}>
                      <TextField
                        autoComplete="off"
                        name="quantity"
                        label="Quantity"
                        value={ShipmentData?.quantity}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 2, mr: 2 }}>
                      <TextField
                        autoComplete="off"
                        name="deliveryAddress"
                        label="Delivery Address"
                        value={ShipmentData?.deliveryAddress}
                        onChange={handeShipmentData}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </div>
                  <div style={{ display: "flex", marginLeft: "20px", justifyContent: "center" }}>
                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 2, mr: 2 }}>
                      <TextField
                        type="date"
                        autoComplete="off"
                        name="shippingDate"
                        label="Shipping Date"
                        value={ShipmentData?.shippingDate}
                        onChange={handeShipmentData}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={12} sx={{ ml: 1, mr: 1 }}>
                      <TextField
                        type="date"
                        autoComplete="off"
                        name="estimatedDeliveryDate"
                        label="Estimated Delivery Date"
                        value={ShipmentData?.estimatedDeliveryDate}
                        onChange={handeShipmentData}
                      />
                    </Grid>
                  </div>
                  <div></div>
                </Grid>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div style={{ padding: "0px 3px" }}>
                    <Button onClick={onClose} type="submit" variant="outlined" color="primary">
                      Cancel
                    </Button>
                  </div>
                  {pathname === "/shipments" ? (
                    <div style={{ padding: "0px 3px" }}>
                      <Button
                        onClick={(e) => HandleAddSubmit(e)}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : pathname === "/companyBranches" ? (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoComplete="off"
                    name="branchName"
                    label="Branch Name"
                    value={addCompanyBranch.branchName}
                    onChange={HandleCompanyBranchesData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                    <Select
                      defaultValue={showCompanyName}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectCompanyId}
                      label="Select Company"
                      onChange={handleChange}
                    >
                      {companyIdList?.map((item) => (
                        <MenuItem
                          onClick={() => setShowCompanyName(item.name)}
                          key={item.id}
                          value={item.id}
                        >
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
                    value={addCompanyBranch.address}
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
                    value={addCompanyBranch.location}
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
                    value={addCompanyBranch.phoneNumber}
                    onChange={HandleCompanyBranchesData}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            ) : null}
          </Grid>

          <div style={{ display: "flex", justifyContent: "end", padding: "8px" }}>
            {pathname === "/shipments" ? null : (
              <div style={{ padding: "0px 3px" }}>
                <Button onClick={onClose} type="submit" variant="outlined" color="primary">
                  Cancel
                </Button>
              </div>
            )}

            {pathname === "/customers" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button
                  disabled={buttonDisable}
                  onClick={(e) => HandleSubmitCustomer(e)}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : pathname === "/employees" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button
                  disabled={buttonDisable}
                  onClick={(e) => handleAddEmployee(e)}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : pathname === "/companies" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button
                  onClick={(e) => HandleSubmitCompany(e)}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : pathname === "/companyBranches" ? (
              <div style={{ padding: "0px 3px" }}>
                <Button
                  onClick={(e) => HandleSubmitCompanyBranchesData(e)}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : null}

            {/* <div style={{ padding: '0px 3px' }}>
              <Button onClick={pathname === "/customer" ? HandleSubmitCustomer() :
                pathname === "/employee" ? HandleSubmitEmployee() : null} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div> */}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomModal;
