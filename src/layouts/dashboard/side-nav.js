// import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
// import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
// import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  // Button,
  Divider,
  Drawer,
  Stack,
  // SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { customers } from "./config";
import { employees } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useRouter } from "next/router";

export const SideNav = (props) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/');
  }
  const userRole = localStorage.getItem("user_role");
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box onClick={() => handleNavigate()}
      >
        <Box
          sx={{
            m: 2,
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            p: "12px",
          }}
        >
          <div
          >
            <Typography
              color="inherit" variant="subtitle1">
              Logistics
            </Typography>
          </div>
        </Box>
      </Box>
      <div></div>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {userRole === "superadmin"
            ? items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })
            : userRole === "customer"
              ? customers.map((item) => {
                const active = item.path ? pathname === item.path : false;

                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })
              : userRole === "employee"
                ? employees.map((item) => {
                  const active = item.path ? pathname === item.path : false;

                  return (
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  );
                })
                : ""}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      ></Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
