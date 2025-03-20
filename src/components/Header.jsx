import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Header = () => {
  const location = useLocation(); // ✅ Get current route
  const navigate = useNavigate();
  const { user, handleLogout, loading } = useContext(UserContext);
  const isAuthPage = location.pathname === "/auth"; // ✅ Check if on /auth page

  return (
    <nav className="flex items-center justify-between py-8">
      <Link to={"/"} className="text-3xl italic font-bold">
        <span className="text-foreground">Snap</span>
        <span className="text-blue-400">Link</span>
      </Link>
      {!user && !loading && !isAuthPage ? (
        <Button
          className="cursor-pointer transition-colors duration-150"
          onClick={() => navigate("/auth")}
        >
          Login
        </Button>
      ) : user && !loading ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full overflow-hidden">
            <Avatar className="cursor-pointer w-10 h-10 object-cover">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="size-full">
                {user?.user_metadata?.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {user?.user_metadata?.full_name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer"
            >
              <LinkIcon />
              <span>My Links</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut className="text-red-500" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : loading ? (
        <div className="rounded-full bg-gray-700 w-10 h-10 flex items-center justify-center"></div>
      ) : null}
    </nav>
  );
};

export default Header;
