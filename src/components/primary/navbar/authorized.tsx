"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomButton from "@/components/ui/custom-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setIsLoginModalOpen, setUser } from "@/redux/reducers/global-slice";
import { CircleUser, LogOut, Settings } from "lucide-react";
import Link from "next/link";

const AuthorizedNavbar = () => {
  const { user } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    dispatch(setUser(null));
    window.location.reload();
  };
  if (!user) {
    return (
      <CustomButton
        variant="outline"
        className="bg-transparent border-2 border-primary rounded-2xl font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
        label="Sign In"
        onClick={() => dispatch(setIsLoginModalOpen(true))}
      />
    );
  }
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <CircleUser /> Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthorizedNavbar;
