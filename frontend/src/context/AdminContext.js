import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const login = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/correthor/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const { err } = await response.json();
        setError(err.message);
      }

      const { data } = await response.json();
      setAdmin(data.name);
      setToken(data.token);

      return admin;
    } catch (error) {}
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    setError(null);
  };

  return (
    <AdminContext.Provider value={{ admin, token, error, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
