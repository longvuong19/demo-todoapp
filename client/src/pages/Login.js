import { Formik } from "formik";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import * as yup from "yup";
import axiosInstance from "../service/api.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { setLogin } from "../redux/UserSlice";

const initRegisterValues = {
  name: "",
  email: "",
  password: "",
  picture: "",
};

const initLoginValues = {
  email: "",
  password: "",
};

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = () => {
  const [page, setPage] = useState("login");
  const isLogin = page === "login";
  const isRegister = page === "register";

  // Người dùng đăng nhập => hàm useDispatch sẽ lưu thông tin vào hàm setLogin từ UserSlice
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 768px)");

  const handleLogin = (values, onSubmitProps) => {
    axiosInstance.post("/auth/login", values).then((res) => {
      onSubmitProps.resetForm();
      dispatch(setLogin(res.data.user));
      alert("Login successfully!");
      navigate("/home");
    });
  };

  const handleRegister = (values, onSubmitProps) => {
    let formData = new FormData();
    for (const property of Object.keys(values)) {
      formData.append(property, values[property]);
    }
    axiosInstance.post("/auth/register", formData).then((res) => {
      onSubmitProps.resetForm();
      alert("Register successfully! You can now log in.");
      setPage("login");
    });
  };

  const handleForm = (values, onSubmitProps) => {
    if (isLogin) handleLogin(values, onSubmitProps);
    if (isRegister) handleRegister(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={isLogin ? initLoginValues : initRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleForm}
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        setFieldValue,
        values,
        handleChange,
        resetForm,
        errors,
      }) => (
        <Box p="32px 0" m="32px auto" width={isNotMobile ? "50%" : "90%"}>
          <Typography textAlign="center" mb="32px" variant="h3">
            Welcome to YourTask
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="28px">
              {isRegister && (
                <>
                  <TextField
                    label="Enter your name..."
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Dropzone
                    multiple={false}
                    acceptedFiles=".jpg , .png, .jpeg"
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="16px"
                        border="2px solid #000"
                        textAlign="center"
                        borderRadius="4px"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography>Add picture</Typography>
                        ) : (
                          <Typography>
                            {values.picture.name} <EditOutlinedIcon />
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </>
              )}
              <TextField
                label="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                label="Enter password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box display="flex" justifyContent="center" m="20px 0">
              <Button type="submid" m="32px 0" background="#00d5fa">
                {isLogin ? "Log In" : "Register"}
              </Button>
            </Box>
            <Typography
              onClick={() => {
                setPage(isLogin ? "register" : "login");
                resetForm();
              }}
              variant="h6"
              textAlign="center"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {isLogin ? (
                <Box>Don't have an account? Please register here!</Box>
              ) : (
                <Box>Already had an account? Please login here.</Box>
              )}
            </Typography>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
