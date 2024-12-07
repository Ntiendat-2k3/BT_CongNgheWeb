import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-blue-600 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold text-white">
          Calculator App
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="mr-4 text-white hover:underline">
                Hồ Sơ
              </Link>
              <button onClick={logout} className="text-white hover:underline">
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-white hover:underline">
                Đăng Nhập
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Đăng Ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
