import sims from "@/assets/images/Logo.png";
import check from "@/assets/images/correct.png";
import failed from "@/assets/images/remove.png";
import InformationComponent from "@/components/information/information";
import { fetchBalanceList } from "@/store/action/actionBalance";
import { fetchProfileUser } from "@/store/action/actionProfile";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Banknote, Loader } from "lucide-react";
import { toast } from "sonner";
import { createPayment } from "@/store/action/actionPayment";
import { formatRupiah } from "@/helpers/helper";
import { fetchServiceLists } from "@/store/action/actionService";
import { ServiceInterface } from "@/types/interface";

export default function PaymentPages() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profileUser);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const services = useSelector((state: RootState) => state.service.services);
  const { code } = useParams();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<string | undefined>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentResult, setPaymentResult] = useState<
    "success" | "failure" | null
  >(null);
  const [mainService, setMainService] = useState<ServiceInterface>();

  useEffect(() => {
    dispatch(fetchProfileUser());
    dispatch(fetchBalanceList());
    dispatch(fetchServiceLists());
  }, [dispatch]);

  useEffect(() => {
    if (code && services.length > 0) {
      const selectedService = services.find(
        (service) => service.service_code === code
      );
      setMainService(selectedService);
      setAmount(selectedService?.service_tariff.toString());
    }
  }, [code, services]);

  const handleToggleBalance = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handlePeymentSubmit = async () => {
    setIsLoading(true);

    const data = {
      top_up_amount: Number(amount),
      transaction_type: "PAYMENT",
      service_code: code,
    };

    try {
      const res = await dispatch(createPayment(data));

      if (res.status === 0) {
        setPaymentResult("success");
        toast.success(res.message);
      } else {
        setPaymentResult("failure");
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      setPaymentResult("failure");
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleCloseResult = () => {
    setPaymentResult(null);
    navigate("/");
  };

  return (
    <section className="w-full flex flex-row items-center justify-center">
      <div className="w-full flex flex-col gap-y-16">
        <InformationComponent
          profile={profile}
          balance={balance}
          showBalance={showBalance}
          handleToggleBalance={handleToggleBalance}
        />

        <div className="w-full flex flex-col gap-y-2 px-24">
          <h5 className="text-[20px]">Pembayaran</h5>
          <div className="w-full flex flex-row items-center gap-x-3">
            <img
              src={mainService?.service_icon}
              alt={mainService?.service_name}
              className="w-[5%] h-full object-contain"
            />

            <p className="text-[18px] font-semibold">
              {mainService?.service_name}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-row gap-x-3 px-24">
          <div className="w-full flex flex-col gap-y-3">
            <form
              onSubmit={handlePayment}
              className="w-full flex flex-col gap-y-5">
              <div
                className={`w-full py-3 gap-x-3 flex flex-row items-center border rounded-md px-5 border-neutral-400 border-opacity-30`}>
                <Banknote className={`w-5 h-5 text-black opacity-30`} />

                <p className="text-black text-[16px]">
                  {formatRupiah(Number(amount))}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                disabled={isLoading}>
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Bayar"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="w-3/12 bg-white">
          <AlertDialogHeader className="w-full flex flex-col items-center justify-center gap-y-3">
            <div className="flex flex-row justify-center w-2/12">
              <img
                src={sims}
                alt="SIMS PPOB"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-y-1">
              <AlertDialogDescription>
                Beli {mainService?.service_name} senilai
              </AlertDialogDescription>
              <AlertDialogTitle>
                Rp. {Number(amount).toLocaleString("id-ID")} ?
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full flex flex-col gap-y-2">
            <AlertDialogAction
              className="text-red-500 h-8"
              onClick={handlePeymentSubmit}
              disabled={isLoading ? true : false}>
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Ya, Lanjutkan Bayar"
              )}
            </AlertDialogAction>
            <AlertDialogCancel
              className="border-none text-neutral-400 h-8 mt-0"
              onClick={() => setShowConfirmation(false)}>
              Batal
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!paymentResult} onOpenChange={handleCloseResult}>
        <AlertDialogContent className="w-3/12 bg-white">
          <AlertDialogHeader className="w-full flex flex-col items-center justify-center gap-y-3">
            {paymentResult === "success" ? (
              <>
                <div className="flex flex-row justify-center w-2/12">
                  <img
                    src={check}
                    alt="Success"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="w-full flex flex-col items-center gap-y-1">
                  <AlertDialogDescription>
                    Pembayaran {mainService?.service_name} senilai
                  </AlertDialogDescription>
                  <AlertDialogTitle>
                    Rp. {Number(amount).toLocaleString("id-ID")} ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>berhasil!</AlertDialogDescription>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row justify-center w-2/12">
                  <img
                    src={failed}
                    alt="Failed"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="w-full flex flex-col items-center gap-y-1">
                  <AlertDialogDescription>
                    Pembayaran {mainService?.service_name} senilai
                  </AlertDialogDescription>
                  <AlertDialogTitle>
                    Rp. {Number(amount).toLocaleString("id-ID")} ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>gagal</AlertDialogDescription>
                </div>
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button className="text-red-500" onClick={handleCloseResult}>
              Kembali ke Beranda
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
