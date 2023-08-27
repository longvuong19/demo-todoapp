import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../service/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/TaskSlice.js";
import Header from "../components/Header";
import Task from "../components/Task.js";

const Home = () => {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const types = ["default", "personal", "shopping", "wishlist", "work"];
  const days = [
    { label: "Today", value: "today" },
    { label: "Last seven", value: "seven" },
    { label: "Last Thirty", value: "thirty" },
  ];

  useEffect(() => {
    axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
      dispatch(setTasks(res.data.tasks));
    });
  }, [typeFilter, dayFilter]);

  const { tasks } = useSelector((state) => state.task);
  // console.log(tasks);

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  return (
    <Box>
      <Header />
      <Container>
        <Box display="flex" justifyContent="space-between" mt="32px" ml="16px">
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Select Type</InputLabel>
            <Select value={typeFilter} onChange={handleTypeChange}>
              {types.map((type, index) => (
                <MenuItem key={`${index}-${type}`} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            {days.map((day, index) => (
              <Button
                variant="contained"
                size="small"
                color={day.value === dayFilter ? "success" : "secondary"}
                key={`${index}-${day.value}`}
                onClick={() => {
                  setDayFilter(day.value);
                }}
              >
                {day.label}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box display="flex" justifyContent="space-between" m="0 16px">
          <Button
            onClick={() => {
              setTypeFilter("");
              setDayFilter("");
            }}
          >
            Clear filter
          </Button>
        </Box>
        <Box m="32px 16px">
          <Grid container spacing={4}>
            {tasks.map((task, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${idx}-${task.id}`}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/task/${task._id}`}
                >
                  <Task task={task} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
