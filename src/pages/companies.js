import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useEffect, useMemo, useState } from 'react';




import React from 'react'
import CustomModal from 'src/components/formModal';
import axios from 'axios';
import Swal from 'sweetalert2';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

const Companies = () => {
  const UserId = localStorage.getItem('user_id');
  const [createCompanyBranch, setCreateCompanyBranch] = useState({
    id: 0,
    companyName: "",
    address: "",
    isDeleted: false,
    addedBy: UserId,

  })

  const token = localStorage.getItem('token')
  const [addCompanyBranches, setAddCompanyBranches] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [showAllCompanies, setShowAllCompanies] = useState([])
  const onClose = () => {
    setModalOpen(false)
  }
  const HandleOpenModal = () => {
    setModalOpen(true)
  }
  const companies = [
    {
      id: '2569ce0d517a7f06d3ea1f24',
      createdAt: '27/03/2019',
      description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
      title: 'Dropbox',
      downloads: '594'
    },
    {
      id: 'ed2b900870ceba72d203ec15',
      createdAt: '31/03/2019',
      description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
      title: 'Medium Corporation',
      downloads: '625'
    },
    {
      id: 'a033e38768c82fca90df3db7',
      createdAt: '03/04/2019',
      description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
      title: 'Slack',
      downloads: '857'
    },
    {
      id: '1efecb2bf6a51def9869ab0f',
      createdAt: '04/04/2019',
      description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
      title: 'Lyft',
      downloads: '406'
    },
    {
      id: '1ed68149f65fbc6089b5fd07',
      createdAt: '04/04/2019',
      description: 'GitHub is a web-based hosting service for version control of code using Git.',
      title: 'GitHub',
      downloads: '835'
    },
    {
      id: '5dab321376eff6177407e887',
      createdAt: '04/04/2019',
      description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
      title: 'Squarespace',
      downloads: '835'
    }
  ];
  const handleCompany = (e) => {
    const SearchValues = e.target.value
    setCreateCompanyBranch({ ...createCompanyBranch, [e.target.name]: SearchValues })
  }
  const [filterText, setFilterText] = useState("");


  const HandleGetCompany = (e) => {
    axios({
      method: "GET",
      url: "https://localhost:7231/api/Company/GetAllCompanies",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setShowAllCompanies(response.data)
    }).catch((err) => {
      console.log(err, 'err');
    })
  }

  useEffect(() => {
    HandleGetCompany()
  }, [])
  const HandleSubmitCompany = (e) => {
    e.preventDefault()
    setAddCompanyBranches([...addCompanyBranches, createCompanyBranch])
    axios({
      method: "POST",
      url: "https://localhost:7231/api/Company/AddCompany",
      data: {
        id: createCompanyBranch?.id,
        name: createCompanyBranch.companyName,
        address: createCompanyBranch.address,
        addedBy: createCompanyBranch?.addedBy,

      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        HandleGetCompany()
        setCreateCompanyBranch({
          id: 0,
          companyName: "",
          address: "",
          isDeleted: false,
          addedBy: UserId,
        })
        Swal.fire({
          icon: 'success',

          title: 'Company Created Successfully',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          Swal.close()
        }, 5000)
      }
      onClose()
    }).catch((err) => {
      console.log(err, 'err');
    })

  }

  const FilterCompanies = useMemo(() => {
    return showAllCompanies?.filter(
      (companies) =>
        companies?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
        companies?.address?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [showAllCompanies, filterText]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div>
      <>
        <CustomModal title="Add Company" HandleSubmitCompany={HandleSubmitCompany}
          handleCompany={handleCompany}
          createCompanyBranch={createCompanyBranch}
          open={modalOpen} onClose={onClose} />
        <Head>
          <title>
            Companies | Logistics
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Companies
                  </Typography>

                </Stack>
                <div>
                  <Button
                    onClick={HandleOpenModal}
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
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
                  placeholder="Search company"
                  startAdornment={(
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <MagnifyingGlassIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )}
                  sx={{ maxWidth: 500 }}
                />
              </Card>
              <Grid
                container
                spacing={3}
              >

                {FilterCompanies?.map((company) => (
                  <>
                    <Grid
                      xs={12}
                      md={6}
                      lg={6}
                      key={company.id}
                    >
                      <CompanyCard HandleGetCompany={HandleGetCompany} company={company} />
                    </Grid></>
                ))}
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >

              </Box>
            </Stack>
          </Container>
        </Box>
      </>
    </div >
  )
}
Companies.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Companies