import MenuCardComponent from "@/components/menu_card/menuCard";
import { fetchBalanceList } from "@/store/action/actionBalance";
import { fetchBannerLists } from "@/store/action/actionBanner";
import { fetchProfileUser } from "@/store/action/actionProfile";
import { fetchServiceLists } from "@/store/action/actionService";
import { AppDispatch, RootState } from "@/store/store";
import { BannerInterface, ServiceInterface } from "@/types/interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import CarouselCardComponent from "@/components/carousel_card/carouselCard";
import InformationComponent from "@/components/information/information";

export default function DashboardPages() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profileUser);
  const banners = useSelector((state: RootState) => state.banner.banner);
  const services = useSelector((state: RootState) => state.service.services);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileUser());
    dispatch(fetchBannerLists());
    dispatch(fetchServiceLists());
    dispatch(fetchBalanceList());
  }, [dispatch]);

  const handleToggleBalance = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  return (
    <main className="w-full flex flex-row items-center justify-center pb-12 md:pb-0">
      <div className="w-full flex flex-col gap-y-8 md:gap-y-16">
        <InformationComponent
          profile={profile}
          balance={balance}
          showBalance={showBalance}
          handleToggleBalance={handleToggleBalance}
        />

        <div className="w-full grid grid-cols-4 md:flex flex-row gap-y-5 md:gap-x-5 px-12 md:px-24">
          {services &&
            services.length > 0 &&
            services.map((service: ServiceInterface) => {
              return (
                <MenuCardComponent
                  key={service?.service_code}
                  service={service}
                />
              );
            })}
        </div>

        <div className="w-full flex flex-col pl-12 md:pl-24">
          <Carousel>
            <CarouselContent className="flex flex-row">
              {banners &&
                banners.length > 0 &&
                banners.map((banner: BannerInterface) => {
                  return (
                    <CarouselCardComponent
                      key={banner?.banner_name}
                      banner={banner}
                    />
                  );
                })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </main>
  );
}
