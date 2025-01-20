import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Card,
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import CustomModal from "../components/formModal";
import axios from "axios";
import Swal from "sweetalert2";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Carson Darrin",
    phone: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Fran Perez",
    phone: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Jie Yan Song",
    phone: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Anika Visser",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Anika Visser",
    phone: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Miron Vitold",
    phone: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Employees = () => {
  const getToken = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [modalOpen, setModalOpen] = useState(false);
  const [addEmployee, setAddEmployee] = useState({
    email: "",
    password: "",
    name: "",
    branchId: 0,
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [addEmployeeData, setAddEmployeeData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const handleEmployeeEmail = (e) => {
    const SearchValues = e.target.value;
    setAddEmployee({ ...addEmployee, [e.target.name]: SearchValues });
  };
  const GetAllEmployees = () => {
    axios({
      method: "GET",
      url: "https://localhost:7231/api/Employees/GetEmployees",
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setEmployeeData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllEmployees();
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setAddEmployeeData([...addEmployeeData, addEmployee]);
    axios({
      method: "POST",
      url: "https://localhost:7231/api/Employees/AddEmployee",
      data: addEmployee,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",

            title: "Employee Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          GetAllEmployees();
          handleModalClose();
          setAddEmployee({
            email: "",
            password: "",
            name: "",
            branchId: 0,
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            country: "",
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const [filterText, setFilterText] = useState("");

  const filteredEmployeeData = useMemo(() => {
    return employeeData.filter(
      (employee) =>
        employee?.name.toLowerCase().includes(filterText.toLowerCase()) ||
        employee?.phoneNumber?.toLowerCase().includes(filterText.toLowerCase()) ||
        employee?.address?.toLowerCase().includes(filterText.toLowerCase()) ||
        employee?.email?.toLowerCase().includes(filterText.toLowerCase()) ||
        employee?.city?.toLowerCase().includes(filterText.toLowerCase()) ||
        employee?.state?.toLowerCase().includes(filterText.toLowerCase()) ||
        employee?.country?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [employeeData, filterText]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <>
      <CustomModal
        title="Add Employee"
        handleAddEmployee={handleAddEmployee}
        addEmployee={addEmployee}
        handleEmployeeEmail={handleEmployeeEmail}
        open={modalOpen}
        onClose={handleModalClose}
      />
      <Head>
        <title>Customers | Logistics</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Employees</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              <div>
                <Button
                  onClick={handleModalOpen}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                onChange={handleFilterChange}
                defaultValue=""
                fullWidth
                placeholder="Search Employees"
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon sx={{ cursor: "pointer" }} color="action" fontSize="small">
                      <MagnifyingGlassIcon sx={{ cursor: "pointer" }} />
                    </SvgIcon>
                  </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
              />
            </Card>
            <CustomersTable
              GetAllEmployees={GetAllEmployees}
              employeeData={filteredEmployeeData}
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Employees.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Employees;
