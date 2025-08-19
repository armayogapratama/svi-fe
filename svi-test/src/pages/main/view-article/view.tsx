import { Label } from "@/components/ui/label";
import { useArticleByIdQuery } from "@/store/features/api";
import { useParams } from "react-router-dom";

export default function ViewArticlePage() {
  const { id } = useParams();

  const { data: noteDatas } = useArticleByIdQuery(Number(id), {
    skip: !id,
  });
  const result = noteDatas?.data;

  return (
    <main className="w-full flex flex-row items-center justify-center pb-12 px-24 md:pb-0">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Article</p>

          <p className="text-[12px] text-neutral-400">
            Status: <span className="text-primary-40">{result?.status}</span>
          </p>
        </div>

        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col gap-y-2">
            <Label className="font-semibold text-[16px]">Title:</Label>

            <p className="text-[16px]">{result?.title}</p>
          </div>

          <div className="w-full flex flex-col gap-y-2">
            <Label className="font-semibold text-[16px]">Category:</Label>

            <p className="text-[16px]">{result?.category}</p>
          </div>

          <div className="w-full flex flex-col gap-y-2">
            <Label className="font-semibold text-[16px]">Content:</Label>

            <p className="text-[16px]">{result?.content}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
