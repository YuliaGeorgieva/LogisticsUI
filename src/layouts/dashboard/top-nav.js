import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  Card,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalTracking from 'src/components/common/Modal';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const [trackingOrderData, setTrackingOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();

  // Open modal with shipment tracking data
  const handleOpen = () => {
    if (searchTerm) {
      setOpen(true);
    }
  };

  // Close the modal
  const handleClose = () => setOpen(false);

  // Fetch tracking data when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        axios({
          method: 'GET',
          url: `https://localhost:7231/api/Shipment/TrackShipment/${searchTerm}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            if (response.status === 200) {
              setTrackingOrderData(response.data);
            }
          })
          .catch((err) => {
            console.log('Error fetching tracking data:', err);
          });
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    <>
      {/* Modal for tracking data */}
      <ModalTracking
        trackingOrderData={trackingOrderData}
        open={open}
        handleClose={handleClose}
      />

      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleOpen(); // Open modal on Enter
                  }
                }}
                fullWidth
                placeholder="Track Shipment"
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon
                      onClick={handleOpen}
                      sx={{ cursor: 'pointer' }}
                      color="action"
                      fontSize="small"
                    >
                      <MagnifyingGlassIcon />
                    </SvgIcon>
                  </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
              />
            </Card>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-neha-punita.png"
            />
          </Stack>
        </Stack>

        {/* Optional: Render tracking data inline below the search field */}
        {trackingOrderData.length > 0 && (
          <Box sx={{ mt: 2, px: 2 }}>
            {trackingOrderData.map((item, index) => (
              <Card key={index} sx={{ p: 2, mb: 2 }}>
                {Object.entries(item).map(([key, value]) => (
                  <Typography key={key}>
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Account popover */}
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
