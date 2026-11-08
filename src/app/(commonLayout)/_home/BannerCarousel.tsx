"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getUserBanners } from "@/services/banner.service";
import LoadingState from "@/components/shared/Loading";
import Image from "next/image";

export function BannerCarousel() {
  const { data, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: () => getUserBanners(),
    staleTime: 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Initialize Autoplay plugin with continuous loop
  const autoplayPlugin = React.useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: false }),
    [],
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Subscribe to event
    api.on("select", onSelect);

    // Clean up subscription on unmount
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (isLoading) {
    return <LoadingState message="Banners loading..." />;
  }

  const banners = data?.data ?? [];

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="relative sm:rounded-2xl rounded-lg">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[autoplayPlugin]}
        onMouseEnter={autoplayPlugin.stop}
        onMouseLeave={autoplayPlugin.reset}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full h-55 sm:62.5">
                <Image
                  src={banner?.image_url || banner?.image_path || ""}
                  alt={banner?.alt_text || `Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover sm:rounded-2xl rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pill / Dash Indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center items-center gap-1.5 pointer-events-auto">
        {banners.map((banner, index) => (
          <button
            key={String(banner.id)}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === index
                ? "w-6 bg-teal-foreground"
                : "w-4 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
