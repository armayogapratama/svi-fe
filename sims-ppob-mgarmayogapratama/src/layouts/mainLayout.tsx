import NavbarComponent from "@/components/navigation_bar/navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavbarComponent />
      <div className="w-screen h-screen py-28 bg-white">
        <Outlet />
      </div>
    </>
  );
}
