import { Box, Select, MenuItem, InputLabel } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      height="52px"
      backgroundColor="#03c6fc"
      padding="0 20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box fontSize="32px" color="#fff" fontWeight="bold">
        <Link to="/home" style={{ textDecoration: "none" }}>
          YourTask
        </Link>
      </Box>
      <Box display="flex" alignItems="center" gap="12px">
        <img
          src={`http://localhost:5000/assets/${user.picturePath}`}
          width="32px"
          height="32px"
          style={{ borderRadius: "50%", objectFit: "cover" }}
          alt={user.name}
        />
        <Select
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
          value={user.name}
        >
          <MenuItem value={user.name}>{user.name}</MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
          >
            Log out
          </MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Header;
