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
  const isNotMoblie = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const types = ["default", "personal", "shopping", "wishlist", "work"];

  const handleFormSubmit = (values, onSubmitProps) => {
    if (mode === "edit") {
      axiosInstance.put(`/task/${values._id}`, values).then((res) => {
        navigate("/home");
      });
    } else {
      values.time = values.time.format("HH:mm");
      axiosInstance.post(`/task/create`, values).then((res) => {
        navigate("/home");
      });
    }
  };

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={mode === "create" ? initValues : task}
      validationSchema={mode === "create" ? initCreateSchema : initEditSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        resetForm,
        values,
        errors,
        touched,
      }) => (
        <Box p="32px 0" m="32px auto" width={isNotMoblie ? "50%" : "90%"}>
          <Typography textAlign="center" mb="32px" variant="h4">
            {mode === "create" ? "Create a task" : "Edit a task"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="32px">
              <TextField
                label="Task name"
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={
                    mode === "edit"
                      ? dayjs(values.date || null)
                      : dayjs(values.date)
                  }
                  minDate={mode === "edit" ? null : dayjs()}
                  onChange={(newValue) => {
                    values.date = newValue.format("YYYY-MM-DD");
                    setDate(values.date);
                  }}
                  onBlur={handleBlur}
                  name="date"
                  textField={(params) => (
                    <TextField {...params} helperText="Select Date" />
                  )}
                  error={Boolean(touched.date) && Boolean(errors.date)}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time"
                  value={
                    mode === "edit"
                      ? dayjs(
                          `${values.date.split("T")[0]}T${values.time}` || null
                        )
                      : dayjs(values.time)
                  }
                  onChange={(newValue) => {
                    values.time = newValue;
                    setTime(values.time);
                  }}
                  onBlur={handleBlur}
                  name="time"
                  textField={(params) => (
                    <TextField {...params} helperText="Set Time" />
                  )}
                  error={Boolean(touched.time) && Boolean(errors.time)}
                />
              </LocalizationProvider>
              <FormControl>
                <InputLabel>Select Type</InputLabel>
                <Select
                  label="Select type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="type"
                  error={Boolean(touched.type && Boolean(errors.type))}
                >
                  {types.map((type, index) => (
                    <MenuItem value={type} key={`${index}-${type}`}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {mode === "edit" && (
                <FormControl>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="status"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              )}
              <Button
                variant="outlined"
                type="submit"
                m="32px 0"
                p="16px 0"
                background="#00D5FA"
              >
                {mode === "edit" ? "Edit Task" : "Create Task"}
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default TaskForm;
