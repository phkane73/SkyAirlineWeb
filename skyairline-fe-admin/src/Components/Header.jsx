import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
  };
  return (
    <div>
      <div className="bg-white h-[75px] shadow-md flex items-center justify-between p-4">
        <Link to="/overview">
          <img
            src="/../../Assets/images/logo.jpg"
            alt="logo"
            className="w-[200px]"
          />
        </Link>
        <div className="flex items-center gap-3 ">
          <i className="fa-solid fa-user-tie"></i>
          <h1>Admin Page</h1>
          <Link to="/" onClick={handleLogout}>
            <span className="text-xl">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
