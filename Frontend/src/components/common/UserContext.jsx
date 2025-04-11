import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`/user/${userId}`);
        if (res.data?.data) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
