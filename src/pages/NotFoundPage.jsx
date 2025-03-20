import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-24 gap-4 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-500">Oops! Page not found.</p>
      <Button
        className="cursor-pointer transition-colors duration-150"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
