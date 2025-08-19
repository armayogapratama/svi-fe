import { columnArticles } from "@/components/colums/column";
import DataTable from "@/components/tables";
import { Button } from "@/components/ui/button";
import { buttonFilters } from "@/constants/constant";
import { useArticleListsQuery } from "@/store/features/api";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPages() {
  const [status, setStatus] = useState("publish");
  const [query, setQuery] = React.useState<
    Record<string, string | number | boolean | undefined>
  >({
    status: "publish",
  });

  const { data: noteDatas, refetch } = useArticleListsQuery(query);
  const result = noteDatas?.data;

  const handleFilterClick = (status: string) => {
    setStatus(status);
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: status,
    }));
  };

  React.useEffect(() => {
    refetch();
  }, [status, refetch, result]);

  return (
    <main className="w-full flex flex-row items-center justify-center pb-12 px-24 md:pb-0">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Articles</p>

          <p className="text-[12px] text-neutral-400">Data Articles</p>
        </div>

        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full flex flex-row justify-between gap-x-5">
            <div className="w-full flex flex-row gap-x-3">
              {buttonFilters.map(
                (
                  item: { id: number; value: string; label: string },
                  i: number
                ) => {
                  return (
                    <Button
                      key={i}
                      className={`w-1/12 cursor-pointer rounded-md border border-primary-40
                        ${
                          status == item.value
                            ? "bg-primary-40 text-white hover:text-primary-40 hover:bg-white"
                            : "bg-white text-primary-40 hover:text-white hover:bg-primary-40"
                        }`}
                      onClick={() => handleFilterClick(item.value)}>
                      {item.label}
                    </Button>
                  );
                }
              )}
            </div>

            <div className="w-2/12 flex flex-row justify-end items-center">
              <Link
                to={"/create"}
                className="w-full h-10 py-2 text-center px-1 bg-white border border-primary-40 hover:text-white hover:bg-primary-50 text-primary-40 rounded-md text-[14px]">
                Tambah
              </Link>
            </div>
          </div>

          <div className="w-full">
            {result && (
              <DataTable
                data={result}
                columns={columnArticles}
                hiddenColumns={[""]}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
