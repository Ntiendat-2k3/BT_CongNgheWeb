import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

interface User {
  username: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập trước đó từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Đây là logic giả lập. Trong thực tế, bạn nên gọi API để xác thực.
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    ) as User[];
    const userExists = registeredUsers.find((u) => u.username === username);
    if (userExists) {
      const loggedInUser = { username };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    ) as User[];
    const userExists = registeredUsers.find((u) => u.username === username);
    if (userExists) {
      return false; // Người dùng đã tồn tại
    }
    const newUser = { username };
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
