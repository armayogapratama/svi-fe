import photo from "@/assets/images/Profile Photo.png";
import { Button } from "../ui/button";
import { InformationInterface } from "@/types/interface";
import { formatBalance } from "@/helpers/helper";

export default function InformationComponent({
  profile,
  balance,
  showBalance,
  handleToggleBalance,
}: InformationInterface) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-y-5 gap-x-8 px-12 md:px-24">
      <div className="w-full md:w-6/12 flex flex-col gap-y-3">
        <div className="w-full">
          {profile.profile_image ===
          "https://minio.nutech-integrasi.com/take-home-test/null" ? (
            <img src={photo} alt={profile?.first_name} />
          ) : (
            <img src={profile?.profile_image} alt={profile?.first_name} />
          )}
        </div>

        <div className="w-full flex flex-col">
          <p className="text-black text-[18px]">Selamat datang,</p>
          <h2 className="text-[32px] text-black font-semibold">
            {profile?.first_name} {profile?.last_name}
          </h2>
        </div>
      </div>

      <div
        className={`w-full h-full flex flex-col justify-evenly bg-balance text-white p-4 rounded-lg shadow-md`}>
        <p className="text-[16px] text-white">Saldo anda</p>
        <h3 className="text-3xl font-bold">
          Rp. {showBalance ? `${formatBalance(balance?.balance)}` : "•••••••"}
        </h3>
        <div className="flex flex-row items-end">
          <Button
            onClick={handleToggleBalance}
            className="text-[16px] py-0 px-0 h-0 text-white text-start">
            {showBalance ? "Hide" : "Lihat Saldo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
