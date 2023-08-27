import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/api";
import { Formik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  FormControl,
  InputLabel,
  Button,
  Select,
} from "@mui/material";

const initEditSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  date: yup.string().required("Required!"),
  type: yup.string().required("Required!"),
  time: yup.string().required("Required!"),
  status: yup.string().required("Required!"),
});

const initCreateSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  date: yup.string().required("Required!"),
  type: yup.string().required("Required!"),
  time: yup.string().required("Required!"),
});

let initValues = {
  name: "",
  type: "",
  date: dayjs().format("YYYY-MM-DD"),
  time: dayjs(),
};

const TaskForm = ({ mode = "edit", task }) => {
  return <Box>TaskForm</Box>;
};

export default TaskForm;
