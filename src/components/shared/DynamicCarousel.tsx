// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import useEmblaCarousel from "embla-carousel-react";
// import { cn } from "cn";
// // /* 1. CAROUSEL WRAPPER & CONTAINER                                            */
// // /* -------------------------------------------------------------------------- */

// export interface CarouselViewportProps extends React.ComponentProps<"div"> {
//   children: React.ReactNode;
//   options?: Parameters<typeof useEmblaCarousel>[0];
// }

// export function CarouselViewport({
//   children,
//   className,
//   options,
//   ...props
// }: CarouselViewportProps) {
//   // 🔹 Embla Carousel Hook with mouse drag & touch support enabled
//   const [emblaRef] = useEmblaCarousel({
//     loop: false,
//     align: "start",
//     dragFree: true, // Smooth dragging/swiping with mouse
//     containScroll: "trimSnaps",
//     ...options,
//   });

//   return (
//     <div
//       ref={emblaRef}
//       data-slot="carousel-viewport"
//       className={cn(
//         "w-full overflow-hidden select-none py-1 touch-pan-y cursor-grab active:cursor-grabbing",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// export interface CarouselTrackProps extends React.ComponentProps<"div"> {
//   layout?: "flex" | "grid";
//   rows?: 1 | 2; // 2 Lines Grid View এর জন্য
// }

// export function CarouselTrack({
//   className,
//   layout = "flex",
//   rows = 1,
//   children,
//   ...props
// }: CarouselTrackProps) {
//   return (
//     <div
//       data-slot="carousel-track"
//       className={cn(
//         // 🔹 FLEX LAYOUT (For Embla Carousel Horizontal Slider)
//         layout === "flex" && "flex gap-3",

//         // 🔹 GRID LAYOUT (For Static Grid or 2-Row Multi-line View)
//         layout === "grid" &&
//           cn(
//             "grid gap-3",
//             rows === 1 &&
//               "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
//             rows === 2 &&
//               "grid-rows-2 grid-flow-col auto-cols-[calc(33.333%-8px)] sm:auto-cols-[calc(20%-10px)]",
//           ),

//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// // /* -------------------------------------------------------------------------- */
// // /* 2. CAROUSEL SLIDE ITEM                                                     */
// // /* -------------------------------------------------------------------------- */

// export interface CarouselSlideProps extends React.ComponentProps<"div"> {
//   children: React.ReactNode;
// }

// export function CarouselSlide({
//   children,
//   className,
//   ...props
// }: CarouselSlideProps) {
//   return (
//     <div
//       data-slot="carousel-slide"
//       className={cn(
//         "min-w-0 shrink-0 grow-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
//         className,
//       )}
//       {...props}
//     >
//       <div className="group/slide relative h-full transition-all duration-300 ">
//         {children}
//       </div>
//     </div>
//   );
// }


"use client";

import useEmblaCarousel from "embla-carousel-react";
import { cn } from "cn";

export interface CarouselViewportProps
  extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  options?: Parameters<typeof useEmblaCarousel>[0];
}

export function CarouselViewport({
  children,
  className,
  options,
  ...props
}: CarouselViewportProps) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    ...options,
  });

  return (
    <div
      ref={emblaRef}
      data-slot="carousel-viewport"
      className={cn(
        "w-full overflow-hidden select-none py-1 touch-pan-y cursor-grab active:cursor-grabbing",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CarouselTrackProps
  extends React.ComponentProps<"div"> {
  layout?: "flex" | "grid";
  rows?: 1 | 2;
}

export function CarouselTrack({
  className,
  layout = "flex",
  rows = 1,
  children,
  ...props
}: CarouselTrackProps) {
  return (
    <div
      data-slot="carousel-track"
      className={cn(
        layout === "flex" && "flex gap-3",

        layout === "grid" &&
          cn(
            "grid gap-3",
            rows === 1 &&
              "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
            rows === 2 &&
              "grid-rows-2 grid-flow-col auto-cols-[calc(33.333%-8px)] sm:auto-cols-[calc(20%-10px)]"
          ),

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CarouselSlideProps
  extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function CarouselSlide({
  children,
  className,
  ...props
}: CarouselSlideProps) {
  return (
    <div
      data-slot="carousel-slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
        className
      )}
      {...props}
    >
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}