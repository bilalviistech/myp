// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../services/storage';
// import api from '../services/api';

export const AuthContext = createContext({
  userToken: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getToken();
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false);
    };

    bootstrap();
  }, []);

  const login = async (token) => {
    await setToken(token);
    setUserToken(token);
  };

  const logout = async () => {
    await removeToken();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};