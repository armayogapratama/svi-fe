import { ServiceInterface } from "@/types/interface";
import { Link } from "react-router-dom";

export default function MenuCardComponent({
  service,
}: {
  service: ServiceInterface;
}) {
  return (
    <Link
      to={`/payment/${service?.service_code}`}
      className="md:w-[200px] flex flex-col gap-y-1 cursor-pointer">
      <div className={`w-full flex justify-center`}>
        <img
          src={service?.service_icon}
          alt={service?.service_name}
          className="object-contain"
        />
      </div>

      <p className="text-center text-[10px] text-black">
        {service?.service_name}
      </p>
    </Link>
  );
}
