import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router"; // Changed 'next/navigation' to 'next/router'
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      axios({
        method: "post",
        url: "https://localhost:7231/api/Account/SignIn",
        data: {
          username: values.email, // Changed 'values.username' to 'values.email'
          password: values.password,
        },
      })
        .then((response) => {
          auth.signIn(response.data);
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_name", response.data.username);
            localStorage.setItem("user_id", response.data.id);
            localStorage.setItem("user_role", response.data.role);
            router.push("/");
          }
        })
        .catch((error) => {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Invalid Username and password" });
          helpers.setSubmitting(false);
        });
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Login | Logistics</title>
      </Head>

      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <div>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    autoSave="off"
                    autoComplete="off"
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}></FormHelperText>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    display={"flex"}
                    justifyContent={"center"}
                    paddingTop={"5px"}
                  >
                    Don&apos;t have an account? &nbsp;
                    <Link
                      component={NextLink}
                      href="/auth/register"
                      underline="hover"
                      variant="subtitle2"
                    >
                      Register
                    </Link>
                  </Typography>
                </Stack>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
