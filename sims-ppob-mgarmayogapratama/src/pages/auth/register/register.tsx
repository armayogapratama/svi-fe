import { useState } from "react";
import sims_ppob from "../../../assets/images/Logo.png";
import login from "../../../assets/images/Illustrasi Login.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/validations/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AtSign, Eye, EyeOff, Loader, LockKeyhole, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerNewUser } from "@/store/action/actionRegister";
import { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/hook";

export default function RegisterPages() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [seen, setSeen] = useState(true);
  const [secondSeen, setSecondSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    const data = {
      email: values?.email,
      first_name: values?.first_name,
      last_name: values?.last_name,
      password: values?.password,
    };

    try {
      const res = await dispatch(registerNewUser(data));

      if (res.status === 0) {
        toast.success(res.message);
        form.reset();
        setIsLoading(false);
        navigate("/login");
      } else {
        toast.error(res.message);
        throw errors;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-row">
        <div className="w-full md:w-9/12 flex flex-col items-center justify-center px-12 md:px-24 gap-y-5">
          <div className="w-full flex flex-col items-center justify-center gap-y-5">
            <div className="w-full flex flex-row justify-center items-center gap-x-3 md:gap-x-5">
              <img src={sims_ppob} alt="sims-ppob" />

              <h1 className="text-xl font-semibold text-black text-center">
                SIMS PPOB
              </h1>
            </div>

            <div className="w-full px-12">
              <h5 className="text-[20px] md:text-[28px] leading-8 text-black text-center">
                Lengkapi data untuk membuat akun
              </h5>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
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
                      <FormMessage className="text-end" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
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
                      <FormMessage className="text-end" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
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
                      <FormMessage className="text-end" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={`w-full flex flex-row items-center border rounded-md pl-5 pr-1 ${
                            errors["password"]
                              ? "border-red-500"
                              : "border-neutral-400 border-opacity-30"
                          }`}>
                          <div className="w-full flex flex-row items-center">
                            <LockKeyhole
                              className={`w-5 h-5 ${
                                errors["password"]
                                  ? "text-red-500"
                                  : "text-neutral-500"
                              }
                              ${
                                form.getFieldState("password").isTouched
                                  ? "opacity-100"
                                  : "opacity-30"
                              }`}
                            />
                            <Input
                              type={!seen ? "text" : "password"}
                              className={`w-full border-none text-[16px] placeholder:text-[16px] 
                                ${
                                  errors["password"]
                                    ? "text-red-500"
                                    : "text-black"
                                }
                                ${
                                  form.getFieldState("password").isTouched
                                    ? "opacity-100"
                                    : "opacity-30"
                                }`}
                              placeholder="buat password"
                              {...field}
                            />
                          </div>

                          <div
                            onClick={() => setSeen(!seen)}
                            className="p-2 cursor-pointer">
                            {seen ? (
                              <EyeOff className="text-black opacity-30 w-[20px] h-[20px]" />
                            ) : (
                              <Eye className="text-black opacity-30 w-[20px] h-[20px]" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-end" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={`w-full flex flex-row items-center border rounded-md pl-5 pr-1 ${
                            errors["confirmPassword"]
                              ? "border-red-500"
                              : "border-neutral-400 border-opacity-30"
                          }`}>
                          <div className="w-full flex flex-row items-center">
                            <LockKeyhole className="w-5 h-5 opacity-30" />
                            <Input
                              type={!secondSeen ? "text" : "password"}
                              className={`w-full border-none text-[16px] placeholder:text-[16px] 
                                ${
                                  errors["confirmPassword"]
                                    ? "text-red-500"
                                    : "text-black"
                                }
                                ${
                                  form.getFieldState("confirmPassword")
                                    .isTouched
                                    ? "opacity-100"
                                    : "opacity-30"
                                }`}
                              placeholder="konfirmasi password"
                              {...field}
                            />
                          </div>

                          <div
                            onClick={() => setSecondSeen(!secondSeen)}
                            className="p-2 cursor-pointer">
                            {secondSeen ? (
                              <EyeOff className="text-black opacity-30 w-[20px] h-[20px]" />
                            ) : (
                              <Eye className="text-black opacity-30 w-[20px] h-[20px]" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-end" />
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
                      "Register"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <p className="text-center">
              sudah punya akun? login{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-red-600 cursor-pointer hover:text-red-700">
                di sini
              </span>
            </p>
          </div>
        </div>

        {!isMobile && (
          <div className="w-full h-svh">
            <img src={login} alt="login" className="w-full h-full" />
          </div>
        )}
      </div>
    </main>
  );
}
