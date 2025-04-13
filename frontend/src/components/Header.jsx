import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Menu, X, User, Moon, Sun, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/authSlice";
import { toggleDarkMode } from "@/redux/themeSlice";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ onCreateNote, sidebarOpen, toggleSidebar }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { darkMode } = useAppSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(signOut());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      className={`${
        darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-writer-paper border-writer-border"
      } border-b z-10 sticky top-0`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          <h1
            className={`text-xl font-semibold ${
              darkMode ? "text-gray-100" : "text-writer-text"
            }`}
          >
            Write Sync
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleToggleDarkMode}
            variant="ghost"
            size="icon"
            className={
              darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : ""
            }
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${
                    darkMode ? "hover:bg-gray-700" : ""
                  }`}
                >
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={
                  darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : ""
                }
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="text-sm opacity-70">
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate("/signin")}
              className={`text-sm ${
                darkMode ? "border-gray-700 hover:bg-gray-700" : ""
              }`}
            >
              Sign In
            </Button>
          )}

          <Button
            onClick={onCreateNote}
            className={`${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-writer-accent hover:bg-blue-600"
            } text-white`}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> New Note
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
