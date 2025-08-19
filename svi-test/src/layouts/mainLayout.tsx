import HumburgerMenuComponent from "@/components/navigation_bar/humburgerMenu";
import NavbarComponent from "@/components/navigation_bar/navbar";
import { useMediaQuery } from "@/hooks/hook";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {!isMobile ? <NavbarComponent /> : <HumburgerMenuComponent />}

      <div className="w-screen h-screen py-28 bg-white">
        <Outlet />
      </div>
    </>
  );
}
