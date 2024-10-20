import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, logoutUser } = useAuth();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 fixed top-5 right-5 "
      onClick={handleLogout}
      style={{ zIndex: 10001 }}
    >
      <span>Logout</span>
      <FaArrowRight className="ml-2" />
    </button>
  );
};

export default Header;
