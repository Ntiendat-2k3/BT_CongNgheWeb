import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Hồ Sơ Người Dùng
        </h2>
        <p className="mb-4 text-gray-700">
          <span className="font-semibold">Tên đăng nhập:</span> {user?.username}
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-2 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
        >
          Đăng Xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
