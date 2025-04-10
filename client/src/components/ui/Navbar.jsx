import React, { useEffect } from "react";
import { Menu, School } from "lucide-react";
import { FiBookOpen, FiEdit, FiLogOut } from "react-icons/fi";
import { FiMonitor } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import DarkMode from "@/DarkMode";
import { useLogoutUserMutation } from "@/slices/api/AuthApi";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      alert("logout")
      await logoutUser();
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      // navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <School size={30} />
            <h1 className="font-extrabold text-2xl">E-Learning</h1>
          </Link>

          {/* Show About & Contact when NOT authenticated */}
          {!isAuthenticated && (
            <>
              <Link to="/about" className="text-lg font-medium hover:text-gray-600 transition">
                About Us
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-gray-600 transition">
                Contact Us
              </Link>
            </>
          )}
        </div>

        {/* User Options */}
        <div className="flex items-center gap-6">
  {isAuthenticated && user?.role !== "instructor" ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role === "student" && (
            <Link to="/my-learning">
              <DropdownMenuItem className="flex items-center gap-2">
                <FiBookOpen />
                My Courses
              </DropdownMenuItem>
            </Link>
          )}
          <Link to="/profile">
            <DropdownMenuItem className="flex items-center gap-2">
              <FiEdit />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={logoutHandler}>
            <FiLogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    // If the user is NOT authenticated, show Login and Sign Up buttons
    !isAuthenticated && (
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
      </div>
    )
  )}
</div>


      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar user={user} isAuthenticated={isAuthenticated} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

// Mobile Navbar
const MobileNavbar = ({ user, isAuthenticated, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 mt-4">
          {!isAuthenticated ? (
            <>
              <Link to="/about" className="text-lg font-medium hover:text-gray-600 transition">
                About Us
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-gray-600 transition">
                Contact Us
              </Link>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          ) : (
            <>
              {user?.role === "student" ? (
                <Link to="/my-learning" className="flex items-center gap-2 text-lg font-medium hover:text-gray-600 transition">
                  <FiBookOpen />
                  My Courses
                </Link>
              ) : (
                <>
                  <Link to="/admin/dashboard" className="flex items-center gap-2 text-lg font-medium hover:text-gray-600 transition">
                  <FiMonitor />
                    Dashboard
                  </Link>
                  <Link to="/admin/course/" className="flex items-center gap-2 text-lg font-medium hover:text-gray-600 transition">
                    <FiBookOpen />
                    Courses
                  </Link>
                </>
              )}

              <Link to="/admin/profile" className="flex items-center gap-2 text-lg font-medium hover:text-gray-600 transition">
                <FiEdit />
                Profile
              </Link>

              <p
                className="flex items-center gap-2 text-lg font-medium text-red-500 cursor-pointer"
               
              >
                <FiLogOut   onClick={logoutHandler}  />
                Log Out
              </p>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
