"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const images = ["/images/banner/banner1.jpg", "/images/banner/banner2.webp"];

export function BannerCarousel() {
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

  return (
    <div className="relative container overflow-hidden rounded-2xl">
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
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-55 sm:62.5">
                <Image
                  src={src}
                  alt={`Banner Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pill / Dash Indicators */}
      <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center items-center gap-1.5 pointer-events-auto">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === index
                ? "w-6 bg-[#00ffc4]"
                : "w-4 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
