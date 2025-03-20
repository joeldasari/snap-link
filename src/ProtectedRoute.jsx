import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  // While user authentication is being verified, show nothing (or a loading spinner)
  if (loading) return <BarLoader width={"100%"} color="#60A5FA" />;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
