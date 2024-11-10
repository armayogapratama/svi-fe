import photo from "@/assets/images/Profile Photo.png";
import { Button } from "@/components/ui/button";
import { fetchProfileUser } from "@/store/action/actionProfile";
import { AppDispatch, RootState } from "@/store/store";
import { AtSign, Loader, Pencil, User2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UpdateProfilePhoto } from "@/store/action/actionPhotoUpdate";

export default function AccountPages() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profileUser);
  const navigate = useNavigate();
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOut, setIsLoadingOut] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
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

  const handleLogout = () => {
    setIsLoadingOut(true);
    setTimeout(() => {
      setIsLoadingOut(false);
      Cookies.remove("token");
      toast.success("Berhasil Logout");
      navigate("/login");
    }, 1000);
  };

  const handleNextPages = () => {
    setIsLoadingNext(true);
    setTimeout(() => {
      setIsLoadingNext(false);
      navigate("/account/edit");
    }, 1000);
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

        <div className="w-10/12 md:w-9/12 flex flex-col items-center justify-center self-center gap-y-5 md:px-24">
          <div className="w-full grid grid-rows-3 gap-y-5">
            <div className="w-full grid grid-rows-2">
              <Label className="font-normal text-[16px]">Email</Label>

              <div className="w-full py-2 flex flex-row gap-x-2 px-3 border border-neutral-400 rounded-md">
                <AtSign className="text-black w-5 h-5" />

                <p className="text-black text-[16px]">{profile?.email}</p>
              </div>
            </div>

            <div className="w-full grid grid-rows-2">
              <Label className="font-normal text-[16px]">Nama Depan</Label>

              <div className="w-full py-2 flex flex-row gap-x-2 px-3 border border-neutral-400 rounded-md">
                <User2 className="text-black w-5 h-5" />

                <p className="text-black text-[16px]">{profile?.first_name}</p>
              </div>
            </div>

            <div className="w-full grid grid-rows-2">
              <Label className="font-normal text-[16px]">Nama Belakang</Label>

              <div className="w-full py-2 flex flex-row gap-x-2 px-3 border border-neutral-400 rounded-md">
                <User2 className="text-black w-5 h-5" />

                <p className="text-black text-[16px]">{profile?.last_name}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <Button
              onClick={handleNextPages}
              disabled={isLoadingNext ? true : false}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-[40px] rounded-lg text-[16px]">
              {isLoadingNext ? (
                <Loader className="animate-spin" />
              ) : (
                "Edit Profile"
              )}
            </Button>

            <Button
              onClick={handleLogout}
              disabled={isLoadingOut ? true : false}
              className="w-full border border-red-600 hover:bg-red-600 hover:text-white rounded-lg text-[16px] text-red-600">
              {isLoadingOut ? <Loader className="animate-spin" /> : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
