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
      className="w-[200px] flex flex-col gap-y-1 cursor-pointer">
      <div className={`w-full`}>
        <img src={service?.service_icon} alt={service?.service_name} />
      </div>

      <p className="text-center text-[10px] text-black">
        {service?.service_name}
      </p>
    </Link>
  );
}
