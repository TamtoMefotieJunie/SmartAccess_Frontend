import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Implement login logic here (e.g., API call)
    console.log("Setting userData to ");
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  const logout = () => {
    // Implement logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);