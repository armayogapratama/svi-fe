import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-screen h-screen flex items-center bg-white justify-center">
      <Outlet />
    </div>
  );
}
