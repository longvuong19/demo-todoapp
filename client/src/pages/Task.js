import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../service/api.js";
import { setTask } from "../redux/TaskSlice.js";
import { Box, Container } from "@mui/system";
import Header from "../components/Header.js";
import TaskForm from "../components/TaskForm.js";

const Task = () => {
  const { id } = useParams();
  const [currentTask, setCurrentTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTask = async () => {
      await axiosInstance.get(`/task/${id}`).then((res) => {
        setCurrentTask(res.data.task);
        dispatch(setTask(res.data.task));
      });
    };
    fetchTask();
  }, [id, dispatch]);

  if (!currentTask) {
    return;
  }

  return (
    <Box>
      <Header />
      <Container>
        <TaskForm task={currentTask} />
      </Container>
    </Box>
  );
};

export default Task;
