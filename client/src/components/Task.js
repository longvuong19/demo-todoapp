import React from "react";
import {
  Card,
  Box,
  CardContent,
  CardActionArea,
  Typography,
  Button,
} from "@mui/material";

const Task = ({ task }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {task.date.split("T")[0]}
            </Typography>
            <Typography fontSize="16px" sx={{ p: 0, mt: "12px" }}>
              {task.type}
            </Typography>
            <Typography
              fontSize="12px"
              fontStyle="italic"
              sx={{ p: 0, mt: "12px" }}
            >
              Status: {task.status}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Task;
