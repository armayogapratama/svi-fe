import photo from "@/assets/images/Profile Photo.png";
import { Button } from "@/components/ui/button";
import { fetchProfileUser } from "@/store/action/actionProfile";
import { AppDispatch, RootState } from "@/store/store";
import { AtSign, Loader, Pencil, User2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UpdateProfilePhoto } from "@/store/action/actionPhotoUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { UpdateUserData } from "@/store/action/actionUserUpdate";
import { userDataSchema } from "@/validations/validation";

export default function AccountEditPages() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profileUser);
  const navigate = useNavigate();
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoProfile, setPhotoProfile] = useState<File | null>(null);
  const [previewPPImage, setPreviewPPImage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchProfileUser());
  }, [dispatch]);

  const handleFilePPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoProfile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPP = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPhotoProfile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
  };

  const handleUpdatePhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (photoProfile) {
      formData.append("profile_image", photoProfile);
    }

    try {
      const res = await dispatch(UpdateProfilePhoto(formData));

      if (res?.status === 0) {
        toast.success(res.message);
        setIsOpen(false);
        setIsLoading(false);
        navigate("/account");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
    }
  }, [profile, form]);

  const { errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    setIsLoading(true);
    const data = {
      email: values?.email,
      first_name: values?.first_name,
      last_name: values?.last_name,
    };

    try {
      const res = await dispatch(UpdateUserData(data));

      if (res.status === 0) {
        toast.success(res.message);
        form.reset();
        setIsLoading(false);
        navigate("/account");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-row items-center justify-center">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-3">
          <div className="w-full flex flex-col items-center relative">
            <div className="w-24 h-24 relative">
              <div className="w-full">
                {profile.profile_image ===
                "https://minio.nutech-integrasi.com/take-home-test/null" ? (
                  <img
                    src={photo}
                    alt={profile?.first_name}
                    className="w-full h-full object-contain rounded-full"
                  />
                ) : (
                  <img
                    src={profile?.profile_image}
                    alt={profile?.first_name}
                    className="w-full h-full rounded-full object-contain"
                  />
                )}
              </div>
              <div className="bg-line-10 p-0.5 rounded-full absolute bottom-0 right-0">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <div
                      onClick={() => setIsOpen(true)}
                      className="w-7 h-7 flex items-center justify-center border border-neutral-400 rounded-full bg-primary-40">
                      <Pencil className="w-4 h-4 text-line-10" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col justify-between w-11/12 md:w-8/12 bg-neutral-50 rounded-lg">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="flex flex-row w-full justify-between">
                          <Label className="text-[32px] text-neutral-700 font-semibold text-start mb-2">
                            Foto Profil
                          </Label>

                          <X
                            onClick={() => setIsOpen(false)}
                            className="w-10 h-10 cursor-pointer"
                          />
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleUpdatePhoto}
                      className="flex flex-col w-full mt-4">
                      <div className="flex flex-col w-full h-full mt-2 px-4">
                        <div className="flex flex-col w-full gap-y-5">
                          {(previewPPImage || profile?.profile_image) && (
                            <div className="relative flex justify-center items-center self-center w-[200px] h-[200px] border-2 border-dashed border-neutral-600 rounded-full">
                              {previewPPImage && (
                                <img src={previewPPImage} alt="Photo Profile" />
                              )}
                            </div>
                          )}

                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropPP}
                            className={`w-full h-[100px] border-2 border-dashed border-neutral-600 rounded-xl mt-1 flex flex-col items-center justify-center `}>
                            <>
                              <input
                                type="file"
                                id="file-input-pp"
                                name="profile_image"
                                accept="image/*"
                                onChange={handleFilePPChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-pp"
                                className="text-[20px] text-center text-neutral-600 p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-end w-full md:w-11/12 self-center my-4 pb-[30px] mt-4 pr-0">
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 text-neutral-50 h-[40px] rounded-lg text-[16px]"
                          type="submit"
                          disabled={isLoading ? true : false}>
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-y-1">
            <h5 className="text-black font-semibold text-[26px]">
              {profile?.first_name} {profile?.last_name}
            </h5>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center self-center gap-y-5 md:px-24">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-10/12 md:w-9/12">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className={`font-normal text-[16px] ${
                        errors["email"] ? "text-red-500" : "text-black"
                      }`}>
                      Email
                    </Label>
                    <FormControl>
                      <div
                        className={`w-full flex flex-row items-center border rounded-md px-5 ${
                          errors["email"]
                            ? "border-red-500"
                            : "border-neutral-400 border-opacity-30"
                        }`}>
                        <AtSign
                          className={`w-5 h-5 ${
                            errors["email"]
                              ? "text-red-500"
                              : "text-neutral-500"
                          } ${
                            form.getFieldState("email").isTouched
                              ? "opacity-100"
                              : "opacity-30"
                          }`}
                        />
                        <Input
                          type="email"
                          className={`w-full border-none text-[16px] placeholder:text-[16px] 
                              ${
                                errors["email"]
                                  ? "text-red-500"
                                  : "text-black opacity-100"
                              } ${
                            form.getFieldState("email").isTouched
                              ? "opacity-100"
                              : "opacity-30"
                          }`}
                          placeholder="masukkan email anda"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-end text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className={`font-normal text-[16px] ${
                        errors["first_name"] ? "text-red-500" : "text-black"
                      }`}>
                      Nama Depan
                    </Label>
                    <FormControl>
                      <div
                        className={`w-full flex flex-row items-center border rounded-md px-5 ${
                          errors["first_name"]
                            ? "border-red-500"
                            : "border-neutral-400 border-opacity-30"
                        }`}>
                        <User2
                          className={`w-5 h-5 ${
                            errors["first_name"]
                              ? "text-red-500"
                              : "text-neutral-500"
                          }
                            ${
                              form.getFieldState("first_name").isTouched
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                        />
                        <Input
                          className={`w-full border-none text-[16px] placeholder:text-[16px] 
                              ${
                                errors["first_name"]
                                  ? "text-red-500"
                                  : "text-black"
                              }
                              ${
                                form.getFieldState("first_name").isTouched
                                  ? "opacity-100"
                                  : "opacity-30"
                              }`}
                          placeholder="nama depan"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-end text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className={`font-normal text-[16px] ${
                        errors["last_name"] ? "text-red-500" : "text-black"
                      }`}>
                      Nama Belakang
                    </Label>
                    <FormControl>
                      <div
                        className={`w-full flex flex-row items-center border rounded-md px-5 ${
                          errors["last_name"]
                            ? "border-red-500"
                            : "border-neutral-400 border-opacity-30"
                        }`}>
                        <User2
                          className={`w-5 h-5 ${
                            errors["last_name"]
                              ? "text-red-500"
                              : "text-neutral-500"
                          }
                            ${
                              form.getFieldState("last_name").isTouched
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                        />
                        <Input
                          className={`w-full border-none text-[16px] placeholder:text-[16px] 
                              ${
                                errors["last_name"]
                                  ? "text-red-500"
                                  : "text-black"
                              }
                              ${
                                form.getFieldState("last_name").isTouched
                                  ? "opacity-100"
                                  : "opacity-30"
                              }`}
                          placeholder="nama belakang"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-end text-red-500" />
                  </FormItem>
                )}
              />

              <div className="w-full">
                <Button
                  disabled={isLoading ? true : false}
                  className="bg-red-600 hover:bg-red-700 w-full rounded-md text-white"
                  type="submit">
                  {isLoading ? (
                    <Loader className="animate-spin text-white w-6 h-6" />
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
