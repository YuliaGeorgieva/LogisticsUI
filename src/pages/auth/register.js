import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatpassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Name is required"),
      repeatpassword: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      axios({
        method: "post",
        url: "https://localhost:7231/api/Account/SignUp",
        data: {
          username: values.password,
          email: values.email,
          password: values.repeatpassword,
        },
      })
        .then((response) => {

          response.status === 200 && router.push("/");
        })

        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Register | Logistics</title>
      </Head>
      <Box
        sx={{
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
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">SignUp</Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  autoComplete="off"
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <TextField
                  autoComplete="off"
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  autoComplete="off"
                  error={!!(formik.touched.password && formik.errors.repeatpassword)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.repeatpassword}
                  label="Confirm Password"
                  name="repeatpassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.repeatpassword}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
              <Typography
                color="text.secondary"
                variant="body2"
                display={"flex"}
                justifyContent={"center"}
                paddingTop={"5px"}
              >
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
