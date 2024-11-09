import { CarouselItem } from "@/components/ui/carousel";
import { BannerInterface } from "@/types/interface";

export default function CarouselCardComponent({
  banner,
}: {
  banner: BannerInterface;
}) {
  return (
    <CarouselItem className="basis-[23%]">
      <img
        src={banner.banner_image}
        alt={banner.banner_name}
        className="w-full h-full object-cover"
      />
    </CarouselItem>
  );
}
