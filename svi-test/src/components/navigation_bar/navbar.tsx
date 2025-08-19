import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <section
      className={`flex flex-row justify-center top-0 items-center self-center bg-primary-10 shadow-md w-full py-5 fixed z-50 transition-all duration-1000`}>
      <div className="w-full px-24 h-16 flex flex-row justify-between items-center">
        <div className="w-4/12 flex flex-row gap-x-3">
          <Link to={"/"} className="w-full flex flex-row items-center gap-x-3">
            <p className="w-11/12 text-[28px] font-bold">
              Sharing Vision Indonesia
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
