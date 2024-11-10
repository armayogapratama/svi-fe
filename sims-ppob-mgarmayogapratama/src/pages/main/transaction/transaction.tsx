import InformationComponent from "@/components/information/information";
import TransactionCardComponent from "@/components/transaction_card/transactionCard";
import { Button } from "@/components/ui/button";
import { formatDateToMonthYear } from "@/helpers/helper";
import { fetchBalanceList } from "@/store/action/actionBalance";
import { fetchProfileUser } from "@/store/action/actionProfile";
import { fetchTransactionHistories } from "@/store/action/actionTransaction";
import { AppDispatch, RootState } from "@/store/store";
import { RecordInterface } from "@/types/interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TransactionPages() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profileUser);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const transactions = useSelector(
    (state: RootState) => state.transaction.transaction
  );
  const [showBalance, setShowBalance] = useState(false);
  const [offset, setOffset] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const limit = 5;

  useEffect(() => {
    dispatch(fetchProfileUser());
    dispatch(fetchBalanceList());
    dispatch(fetchTransactionHistories(offset, limit));
  }, [dispatch, offset, limit]);

  const handleToggleBalance = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return formatDateToMonthYear(date.toISOString());
  }).reverse();

  const filteredTransactions = transactions.records?.filter((record) => {
    const recordMonth = formatDateToMonthYear(record.created_on);
    return selectedMonth ? recordMonth === selectedMonth : true;
  });

  return (
    <section className="w-full flex flex-col items-center justify-center pb-8">
      <div className="w-full flex flex-col gap-y-8 md:gap-y-16">
        <InformationComponent
          profile={profile}
          balance={balance}
          showBalance={showBalance}
          handleToggleBalance={handleToggleBalance}
        />

        <div className="w-full flex flex-col gap-y-1 px-4 md:px-24">
          <h5 className="text-[20px] font-semibold">Semua Transaksi</h5>

          <div className="w-full flex gap-x-2 mb-4">
            <div className="flex gap-x-3 md:gap-x-6">
              {lastSixMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`py-2 rounded ${
                    selectedMonth === month ? "text-red-500" : "text-gray-700"
                  }`}>
                  {month}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-5">
            {filteredTransactions && filteredTransactions.length > 0 ? (
              filteredTransactions.map(
                (record: RecordInterface, index: number) => (
                  <TransactionCardComponent
                    key={record?.description + index}
                    record={record}
                  />
                )
              )
            ) : (
              <p className="text-gray-300 text-center mt-24">
                Maaf tidak ada riwayat transaksi saat ini.
              </p>
            )}

            {filteredTransactions && filteredTransactions.length > 0 && (
              <div className="w-full">
                <Button
                  onClick={handleShowMore}
                  className="text-red-500 text-[16px] w-full">
                  Show More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
