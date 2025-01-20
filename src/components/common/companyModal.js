import { Fade } from '@mui/material';
import React from 'react'

const CompanyModal = () => {
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
    const columns = [
        { id: "Location", label: "Location", minWidth: 100 },
        { id: "Branch Name", label: "Branch Name", minWidth: 170 },
        { id: "Address", label: "Address", minWidth: 170 },
        { id: "Phone Numbe", label: "Phone Number", minWidth: 170 },
    ];
    return (
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
                        Company Branches
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
                            {/* <TableBody>
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
                            </TableBody> */}
                        </Table>
                    </Card>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CompanyModal