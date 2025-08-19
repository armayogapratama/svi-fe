import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateArticleMutation } from "@/store/features/api";
import { ArticleInterface } from "@/store/features/interface";
import { ArticleSchema } from "@/store/features/validation";
import { ApiResponse, DataObject } from "@/types/interface";
import { Loader } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    title: "",
    category: "",
    status: "",
    content: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const handleCreateArticle = async (e: React.FormEvent, status: string) => {
    e.preventDefault();
    setErrors({});

    console.log("masuk");

    const validationResult = ArticleSchema.safeParse(data);
    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    console.log("keluar");

    try {
      const response: ApiResponse<DataObject<ArticleInterface>> =
        await createArticle({
          ...data,
          status: status,
        }).unwrap();

      console.log(response, "ini response");

      if (response?.status == "Success") {
        toast.success(response?.message);
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full flex flex-row items-center justify-center pb-12 px-96 md:pb-0">
      <div className="w-full flex flex-col gap-y-3 p-6 mt-12 border border-primary-40 rounded-md">
        <div className="w-full flex flex-col justify-center items-center gap-y-3">
          <h4 className="font-semibold text-[20px] text-primary-40">
            Create New Article
          </h4>
        </div>

        <div className="w-full flex flex-col gap-y-5 items-start justify-center">
          <form className="w-full flex flex-col gap-y-5">
            <div className="w-full flex flex-col gap-y-8">
              <div className="w-full flex flex-col gap-y-2">
                <Label className="text-neutral-80 text-[16px]">Title</Label>
                <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                  <div className="w-full">
                    <Input
                      type="text"
                      name="title"
                      value={data?.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({
                          ...data,
                          title: e.target.value,
                        })
                      }
                      className="placeholder:opacity-20"
                      placeholder="Create Your Title..."
                    />
                  </div>
                </div>
                {errors.title && (
                  <p className="text-error-30 text-[14px]">{errors.title}</p>
                )}
              </div>

              <div className="w-full flex flex-col gap-y-2">
                <Label className="text-neutral-80 text-[16px]">Category</Label>
                <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                  <div className="w-full">
                    <Input
                      type="text"
                      name="category"
                      value={data?.category}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, category: e.target.value })
                      }
                      className="placeholder:opacity-20"
                      placeholder="Create Your Category..."
                    />
                  </div>
                </div>
                {errors.category && (
                  <p className="text-error-30 text-[14px]">{errors.category}</p>
                )}
              </div>

              <div className="w-full flex flex-col gap-y-2">
                <Label className="text-neutral-80 text-[16px]">Content</Label>
                <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                  <div className="w-full">
                    <Textarea
                      name="content"
                      value={data?.content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setData({ ...data, content: e.target.value })
                      }
                      className="placeholder:opacity-20 h-40"
                      placeholder="Create Your Content..."
                    />
                  </div>
                </div>
                {errors.content && (
                  <p className="text-error-30 text-[14px]">{errors.content}</p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-row justify-center gap-x-5">
              <Button
                disabled={isLoading}
                onClick={(e: React.FormEvent) =>
                  handleCreateArticle(e, "draft")
                }
                type="submit"
                className="bg-white hover:bg-primary-50 text-primary-40 hover:text-white border border-primary-40 rounded-md w-6/12">
                {isLoading ? <Loader className="animate-spin" /> : "Draft"}
              </Button>

              <Button
                disabled={isLoading}
                onClick={(e: React.FormEvent) =>
                  handleCreateArticle(e, "publish")
                }
                type="submit"
                className="bg-primary-40 hover:bg-primary-50 text-white w-6/12">
                {isLoading ? <Loader className="animate-spin" /> : "Publish"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
