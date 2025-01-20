import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Alert,
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
import Toaster from "src/components/common/Alert";
import Swal from "sweetalert2";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { useRouter } from "next/router";

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

const Page = () => {
  const UserID = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [modalOpen, setModalOpen] = useState(false);
  const [getCompanyBranchesdata, setGetCompanyBranchesdata] = useState([]);
  const [companyIdList, setcompanyIdList] = useState([]);
  const [selectCompanyId, setSelectCompanyId] = useState("");
  const handleChange = (event) => {
    setSelectCompanyId(event.target.value);
  };
  const [addCompanyBranch, setAddCompanyBranch] = useState({
    id: 0,
    branchName: "",
    address: "",
    location: "",
    phoneNumber: "",
    companyId: selectCompanyId,
    isDeleted: false,
    addedBy: UserID,
  });
  const [showCompanyName, setShowCompanyName] = useState("");
  const [showAllCompanyBranches, setShowAllCompanyBranches] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [addCostumerData, setAddCostumerData] = useState([]);

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
  const router = useRouter();
  const { data } = router.query;

  const CompanyID = data;
  const ShowAllCompanyBranches = () => {
    if (CompanyID) {
      axios({
        method: "GET",
        url: `https://localhost:7231/api/CompanyBranch/GetBranchesByCompanyId/${CompanyID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        if (response.status === 200) {

          setGetCompanyBranchesdata(response.data);
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      axios({
        method: "GET",
        url: "https://localhost:7231/api/CompanyBranch/GetAllCompanyBranchs",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {

            setGetCompanyBranchesdata(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

  };
  useEffect(() => {
    ShowAllCompanyBranches();
  }, []);

  const HandleCompanyBranchesData = (e) => {
    const SearchValues = e.target.value;
    setAddCompanyBranch({ ...addCompanyBranch, [e.target.name]: SearchValues });
  };

  const HandleSubmitCompanyBranchesData = (e) => {
    e.preventDefault();
    setShowAllCompanyBranches([...showAllCompanyBranches, addCompanyBranch]);
    setShowAlert(true);
    axios({
      method: "POST",
      url: "https://localhost:7231/api/CompanyBranch/AddCompanyBranch",
      data: {
        id: addCompanyBranch?.id,
        companyId: selectCompanyId,
        branchName: addCompanyBranch.branchName,
        address: addCompanyBranch.address,
        location: addCompanyBranch.location,
        phoneNumber: addCompanyBranch.phoneNumber,
        isDeleted: addCompanyBranch?.isDeleted,
        addedBy: addCompanyBranch?.addedBy,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setShowAlert(false);
          handleModalClose();
          ShowAllCompanyBranches();
          setAddCompanyBranch({
            email: "",
            password: "",
            name: "",
            branchId: 0,
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            country: "",
          })
          Swal.fire({
            icon: "success",

            title: "Company Branch Created Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });

    setAddCompanyBranch({
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
  };
  const [filterText, setFilterText] = useState("");

  const filteredCompanyBranches = useMemo(() => {
    if (filterText === "") {
      return getCompanyBranchesdata; // Show original data when filter text is empty
    } else {
      return getCompanyBranchesdata?.filter(
        (branch) =>
          branch?.branchName?.toLowerCase().includes(filterText.toLowerCase()) ||
          branch?.phoneNumber?.toLowerCase().includes(filterText.toLowerCase()) ||
          branch?.address?.toLowerCase().includes(filterText.toLowerCase()) ||
          branch?.location?.toLowerCase().includes(filterText.toLowerCase()) ||
          branch?.addedDate?.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }, [getCompanyBranchesdata, filterText]);
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

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

  return (
    <>
      <CustomModal
        showCompanyName={showCompanyName}
        setShowCompanyName={setShowCompanyName}
        HandleSubmitCompanyBranchesData={HandleSubmitCompanyBranchesData}
        HandleCompanyBranchesData={HandleCompanyBranchesData}
        selectCompanyId={selectCompanyId}
        companyIdList={companyIdList}
        handleChange={handleChange}
        ShowAllCompanyBranches={ShowAllCompanyBranches}
        addCompanyBranch={addCompanyBranch}
        open={modalOpen}
        onClose={handleModalClose}
        title="Add Company Branches"
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
                <Typography variant="h4">Company Branches</Typography>
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
            {/* <CustomersSearch props={{ placeholder: 'Search Customer' }} /> */}
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                onChange={handleFilterChange}
                defaultValue=""
                value={filterText}
                fullWidth
                placeholder="Search Company Branches"
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
              CompanyID={CompanyID}
              handleChange={handleChange}
              selectCompanyId={selectCompanyId}
              handleModalClose={handleModalClose}
              HandleCompanyBranchesData={HandleCompanyBranchesData}
              ShowAllCompanyBranches={ShowAllCompanyBranches}
              getCompanyBranchesdata={filteredCompanyBranches}
              count={data?.length}
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
