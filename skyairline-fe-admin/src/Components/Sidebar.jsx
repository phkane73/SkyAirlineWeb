import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="bg-[#2D7690] min-h-[628px] pt-4">
      <div className="sidebar_body">
        <Button
          style={{
            color: "white",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "15px 10px 15px 10px",
          }}
          variant="elevated"
          component={Link}
          to="/"
        >
          <i className="fa-solid fa-table-cells-large"></i>
          <h1 className="pl-4">Tổng quan</h1>
        </Button>
        <Button
          style={{
            color: "white",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "15px 10px 15px 10px",
          }}
          variant="elevated"
          component={Link}
          to="/plane"
        >
          <i className="fa-solid fa-plane"></i>
          <h1 className="pl-4">Quản lý máy bay</h1>
        </Button>
        <Button
          style={{
            color: "white",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "15px 10px 15px 10px",
          }}
          variant="elevated"
          component={Link}
          to="/airport"
        >
          <i className="fa-solid fa-inbox"></i>
          <h1 className="pl-4">Quản lý sân bay</h1>
        </Button>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{
              color: "white",
              width: "100%",
              textAlign: "left",
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "18px",
              fontWeight: "bold",
              padding: "15px 10px 15px 10px",
            }}
          >
            <i class="fa-regular fa-calendar-days"></i>
            <h1 className="pl-4">
              Quản lý lịch bay <i class="fa-solid fa-caret-down"></i>
            </h1>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiMenu-paper": { backgroundColor: "#2D7690" },
            }}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/schedule/create"
              sx={{ borderBottom: 1, color: "white" }}
            >
              <i className="fa-solid fa-plus"></i>{" "}
              <h1 className="pl-4">Tạo các chuyến bay</h1>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/schedule/list"
              sx={{ color: "white" }}
            >
              <i class="fa-solid fa-list"></i>
              <h1 className="pl-4">Danh sách chuyến bay</h1>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
