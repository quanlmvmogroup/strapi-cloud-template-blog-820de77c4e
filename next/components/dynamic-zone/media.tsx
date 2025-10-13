import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { getStrapiMedia } from '../ui/strapi-image';

export function Media({
  media,
}: {
  media: { url: string; alternativeText: string; mime: string }[];
}) {
  console.log('🚀 ~ media.tsx:9 ~ Media ~ media:', media);

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Carousel className="relative">
        <CarouselContent>
          {media.map((item, index) => {
            const src = getStrapiMedia(item.url);
            if (src) {
              if (item.mime.startsWith('image/')) {
                return (
                  <CarouselItem
                    key={index}
                    className="overflow-hidden rounded-lg"
                  >
                    <img
                      src={src}
                      alt={item.alternativeText || `Media image ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  </CarouselItem>
                );
              } else if (item.mime.startsWith('video/')) {
                return (
                  <CarouselItem
                    key={index}
                    className="overflow-hidden rounded-lg"
                  >
                    <video
                      src={src}
                      className="w-full aspect-video object-cover transform rounded-lg"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </CarouselItem>
                );
              }
            }
          })}
        </CarouselContent>
        <CarouselPrevious className="left-3 !bg-black/100 !opacity-100 text-white" />
        <CarouselNext className="right-3 !bg-black/100 !opacity-100 text-white" />
      </Carousel>
    </div>
  );
}
