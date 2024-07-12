import { createContext, useContext, useState } from "react";
import { AdminContext } from "./AdminContext";

export const CorrectorContext = createContext();

export const CorrectorProvider = ({ children }) => {
  const { token } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const [listData, setListData] = useState();
  const [createData, setCreateData] = useState();
  const [updateData, setUpdateData] = useState();
  const [deleteData, setDeleteData] = useState();

  const list = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/correthor/correctors",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        const { err } = await response.json();
        throw err.message;
      }

      const data = await response.json();
      setListData(data);
      return data;

    } catch (err) {
      setError(err);
    }
  };

  const create = async (name) => {
    try {
      const response = await fetch("http://localhost:3001/correthor/correctors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name })
      });
  
      if (response.status !== 201) {
        const { err } = await response.json();
        throw err.message;
      }
  
      setError("");
      const data = await response.json();
      setCreateData(data);
      return data;

    } catch (err) {
      setError(err);
    }
  };

  const edit = async (id, name) => {
    try {
      const response = await fetch(`http://localhost:3001/correthor/correctors/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
  
      if (response.status !== 200) {
        const { err } = await response.json();
        throw err.message;
      }
  
      setError("");
      const data = await response.json();
      setUpdateData(data);
      return data;

    } catch (err) {
      setError(err);
    }
  };

  const destroy = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/correthor/correctors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status !== 200) {
        const { err } = await response.json();
        throw err.message;
      }

      setError("");
      const data = await response.json();
      setDeleteData(data);
      return data;

    } catch (err) {
      setError(err);
    }
  };

  const listCorrections = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/correthor/corrections/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const { err } = await response.json();
        throw err.message;
      }

      setError("");
      const { data } = await response.json();
      setListData(data);
      return data;

    } catch (err) {
      setError(err);
    }
  }

  return (
    <CorrectorContext.Provider value={{ list, create, edit, destroy, error, setError, listData, listCorrections }}>
      {children}
    </CorrectorContext.Provider>
  );
};
