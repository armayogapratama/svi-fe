import sims from "@/assets/images/Logo.png";
import check from "@/assets/images/correct.png";
import failed from "@/assets/images/remove.png";
import InformationComponent from "@/components/information/information";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { amounts } from "@/constants/constant";
import { fetchBalanceList } from "@/store/action/actionBalance";
import { fetchProfileUser } from "@/store/action/actionProfile";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTopUp } from "@/store/action/actionTopup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Banknote, Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/hook";

export default function TopupPages() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profileUser);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [topUpResult, setTopUpResult] = useState<"success" | "failure" | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchProfileUser());
    dispatch(fetchBalanceList());
  }, [dispatch]);

  const handleToggleBalance = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  const handleAmountClick = (value: number) => {
    setAmount(value.toString());
    setSelectedAmount(value);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleTopUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const topUpAmount = Number(amount);
    if (topUpAmount < 10000) {
      toast.warning("Minimal top-up adalah Rp10,000");
      return;
    } else if (topUpAmount > 1000000) {
      toast.warning("Maksimal top-up adalah Rp1,000,000");
      return;
    }

    setShowConfirmation(true);
  };

  const handleTopUpSubmit = async () => {
    setIsLoading(true);
    const data = {
      top_up_amount: Number(amount),
      transaction_type: "TOPUP",
    };

    try {
      const res = await dispatch(createTopUp(data));

      if (res.status === 0) {
        setTopUpResult("success");
        toast.success(res.message);
      } else {
        setTopUpResult("failure");
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      setTopUpResult("failure");
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleCloseResult = () => {
    setTopUpResult(null);
    navigate("/");
  };

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-y-8 md:gap-y-16">
        <InformationComponent
          profile={profile}
          balance={balance}
          showBalance={showBalance}
          handleToggleBalance={handleToggleBalance}
        />

        <div className="w-full flex flex-col gap-y-1 px-12 md:px-24">
          <p className="text-[18px] md:text-[20px]">Silahkan masukkan</p>
          <h5 className="text-[24px] md:text-[32px] font-semibold">
            Nominal Top Up
          </h5>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-y-3 md:gap-x-3 px-12 md:px-24">
          {isMobile && (
            <div className="grid grid-cols-3 gap-y-5 gap-x-3">
              {amounts.map((amt: number) => (
                <Button
                  key={amt}
                  className={`text-[14px] p-2 border border-gray-400 rounded-md ${
                    selectedAmount === amt
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleAmountClick(amt)}>
                  Rp{amt.toLocaleString("id-ID")}
                </Button>
              ))}
            </div>
          )}

          <div className="w-full md:w-9/12 flex flex-col gap-y-3">
            <form
              onSubmit={handleTopUp}
              className="w-full flex flex-col gap-y-5">
              <div
                className={`w-full flex flex-row items-center border rounded-md px-5 border-neutral-400 border-opacity-30`}>
                <Banknote className={`w-5 h-5 text-black opacity-30`} />
                <Input
                  type="number"
                  name="top_up_amount"
                  placeholder="Masukan nominal Top Up"
                  value={amount}
                  onChange={handleCustomInputChange}
                  className="w-full p-2 border-none placeholder:opacity-30"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                disabled={isLoading || amount === ""}>
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Top Up"
                )}
              </Button>
            </form>
          </div>

          {!isMobile && (
            <div className="grid grid-cols-3 gap-y-5 gap-x-3">
              {amounts.map((amt: number) => (
                <Button
                  key={amt}
                  className={`text-[14px] p-2 border border-gray-400 rounded-md ${
                    selectedAmount === amt
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleAmountClick(amt)}>
                  Rp{amt.toLocaleString("id-ID")}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="w-10/12 md:w-3/12 bg-white rounded-md">
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
                Anda yakin untuk top up sebesar
              </AlertDialogDescription>
              <AlertDialogTitle>
                Rp. {Number(amount).toLocaleString("id-ID")} ?
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full flex flex-col gap-y-2">
            <AlertDialogAction
              className="text-red-500 h-8"
              onClick={handleTopUpSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Ya, Lanjutkan Top Up"
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

      <AlertDialog open={!!topUpResult} onOpenChange={handleCloseResult}>
        <AlertDialogContent className="w-10/12 md:w-3/12 bg-white rounded-md">
          <AlertDialogHeader className="w-full flex flex-col items-center justify-center gap-y-3">
            {topUpResult === "success" ? (
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
                    Top Up sebesar
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
                    Top Up sebesar
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
