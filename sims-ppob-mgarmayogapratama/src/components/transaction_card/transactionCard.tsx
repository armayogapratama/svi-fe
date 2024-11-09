import { formatDateString, formatRupiah, formatToWIB } from "@/helpers/helper";
import { RecordInterface } from "@/types/interface";
import { Minus, Plus } from "lucide-react";

export default function TransactionCardComponent({
  record,
}: {
  record: RecordInterface;
}) {
  return (
    <div className="w-full flex flex-row justify-between border border-neutral-300 rounded-md px-5 py-2">
      <div className="w-full flex flex-col gap-y-1">
        <div className="flex flex-row items-center gap-x-2">
          {record?.transaction_type === "TOPUP" ? (
            <Plus className="w-5 h-5 text-green-500" />
          ) : (
            <Minus className="w-5 h-5 text-red-500" />
          )}

          {record?.transaction_type === "TOPUP" ? (
            <p className="text-green-500 text-[18px]">
              {formatRupiah(record?.total_amount)}
            </p>
          ) : (
            <p className="text-red-500 text-[18px]">
              {formatRupiah(record?.total_amount)}
            </p>
          )}
        </div>

        <div className="w-full flex flex-row gap-x-2">
          <p className="text-[12px] text-gray-400">
            {formatDateString(record?.created_on)}
          </p>

          <p className="text-[12px] text-gray-400">
            {formatToWIB(record?.created_on)}
          </p>
        </div>
      </div>

      <div className="w-2/12">
        <p className="text-black text-[12px] text-end">{record?.description}</p>
      </div>
    </div>
  );
}
