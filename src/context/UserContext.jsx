import { getCurrentUser, signOut } from "@/db/auth";
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const { data, error } = await getCurrentUser();
      if (error) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setUser(data.user);
      setIsAuthenticated(data.user?.role === "authenticated");
      setLoading(false);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("longURL");
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogout, isAuthenticated, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
