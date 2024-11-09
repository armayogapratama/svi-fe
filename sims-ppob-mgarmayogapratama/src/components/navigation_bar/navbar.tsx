import sims_ppob from "@/assets/images/Logo.png";
import { Link, useLocation } from "react-router-dom";

export default function NavbarComponent() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <section
      className={`flex flex-row justify-center items-center self-center bg-neutral-50 shadow-md w-full py-5 fixed z-50 transition-all duration-1000`}>
      <div className="w-full px-24 flex flex-row justify-between items-center">
        <div className="w-4/12 flex flex-row gap-x-3">
          <Link to={"/"} className="w-full flex flex-row items-center gap-x-3">
            <div className="w-1/12 h-full">
              <img src={sims_ppob} alt="sims-ppob" />
            </div>

            <p className="w-11/12 text-[16px] font-bold">SIMS PPOB</p>
          </Link>
        </div>

        <div className="w-full flex flex-row justify-end gap-x-6">
          <div className="w-full flex flex-row justify-end items-center gap-x-12">
            <Link
              to="/top-up"
              className={`font-normal text-[16px] px-2 hover:text-red-600 ${
                isActive("/top-up") ? "text-red-600" : "text-black"
              }`}>
              Top Up
            </Link>

            <Link
              to="/transaction"
              className={`font-normal text-[16px] hover:text-red-600 ${
                isActive("/transaction") ? "text-red-600" : "text-black"
              }`}>
              Transaction
            </Link>

            <Link
              to="/account"
              className={`font-normal text-[16px] hover:text-red-600 ${
                isActive("/account") ? "text-red-600" : "text-black"
              }`}>
              Akun
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
