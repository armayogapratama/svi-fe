import sims_ppob from "@/assets/images/Logo.png";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function HumburgerMenuComponent() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <section
      className={`flex flex-row justify-center items-center self-center bg-neutral-50 shadow-md w-full py-5 fixed z-50 transition-all duration-1000`}>
      <div className="w-full px-12 md:px-24 flex flex-row justify-between items-center">
        <div className="w-full md:w-4/12 flex flex-row gap-x-3">
          <Link to={"/"} className="w-full flex flex-row items-center gap-x-3">
            <div className="w-2/12 h-full">
              <img
                src={sims_ppob}
                alt="sims-ppob"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="w-full md:w-11/12 text-[16px] font-bold">SIMS PPOB</p>
          </Link>
        </div>

        <div className="w-5/12 md:w-full flex flex-row justify-end gap-x-6">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-7 h-7 text-line-80" />
            </SheetTrigger>
            <SheetContent className="flex flex-col bg-red-600 p-0 w-8/12 h-full py-4 gap-y-5">
              <div className="w-full flex flex-col md:flex-row justify-end items-center gap-y-6 mt-12 md:mt-0 md:gap-x-12">
                <Link
                  to="/top-up"
                  className={`w-full text-center font-normal border-b border-white text-[16px] p-2 hover:text-red-600 hover:bg-white ${
                    isActive("/top-up") ? "text-red-600 bg-white" : "text-white"
                  }`}>
                  Top Up
                </Link>

                <Link
                  to="/transaction"
                  className={`font-normal w-full text-center border-b border-white text-[16px] p-2 hover:text-red-600 hover:bg-white ${
                    isActive("/transaction")
                      ? "text-red-600 bg-white"
                      : "text-white"
                  }`}>
                  Transaction
                </Link>

                <Link
                  to="/account"
                  className={`font-normal w-full text-center border-b border-white p-2 text-[16px] hover:text-red-600 hover:bg-white ${
                    isActive("/account")
                      ? "text-red-600 bg-white"
                      : "text-white"
                  }`}>
                  Akun
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
