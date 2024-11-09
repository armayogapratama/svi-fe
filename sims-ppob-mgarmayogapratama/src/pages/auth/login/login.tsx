import { useState } from "react";
import sims_ppob from "../../../assets/images/Logo.png";
import login from "../../../assets/images/Illustrasi Login.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validations/validation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AtSign, Eye, EyeOff, Loader, LockKeyhole, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { UserLogin } from "@/store/action/actionLogin";

export default function LoginPages() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const data = {
      email: values?.email,
      password: values?.password,
    };

    try {
      const res = await dispatch(UserLogin(data));

      if (res.status === 0) {
        toast.success(res.message);
        form.reset();
        Cookies.set("token", res?.data?.token, { expires: 0.5 });
        setIsLoading(false);
        navigate("/");
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
        <div className="w-9/12 flex flex-col items-center justify-between pt-32 pb-16 gap-y-5">
          <div className="w-full flex flex-col items-center justify-center px-24 gap-y-5">
            <div className="w-full flex flex-col items-center justify-center gap-y-5">
              <div className="w-full flex flex-row justify-center gap-x-5">
                <img src={sims_ppob} alt="sims-ppob" />

                <h1 className="text-xl font-semibold text-black text-center">
                  SIMS PPOB
                </h1>
              </div>

              <div className="w-full px-12">
                <h5 className="text-[28px] leading-8 text-black text-center">
                  Masuk atau buat akun untuk memulai
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
                        {/* <FormMessage className="text-end" /> */}
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
                                placeholder="masukkan password anda"
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
                        {/* <FormMessage className="text-end" /> */}
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
                        "Masuk"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              <p className="text-center">
                belum punya akun? registrasi{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-red-600 cursor-pointer hover:text-red-700">
                  di sini
                </span>
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-2 justify-end px-8">
            {errors.email && (
              <div className="w-full flex flex-row justify-between items-center p-2 bg-red-600 bg-opacity-10 text-red-600 rounded-md">
                <p className="text-[14px]">
                  {errors.email && <p>{errors.email.message}</p>}
                </p>

                <X className="w-5 h-5 text-red-600" />
              </div>
            )}
            {errors.password && (
              <div className="w-full flex flex-row justify-between items-center p-2 bg-red-600 bg-opacity-10 text-red-600 rounded-md">
                <p className="text-[14px]">
                  {errors.password && <p>{errors.password.message}</p>}
                </p>

                <X className="w-5 h-5 text-red-600" />
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-svh">
          <img src={login} alt="login" className="w-full h-full" />
        </div>
      </div>
    </main>
  );
}
