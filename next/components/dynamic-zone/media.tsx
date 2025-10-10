import { getStrapiMedia } from '../ui/strapi-image';

export function Media({
  media,
}: {
  media: { url: string; alternativeText: string; mime: string }[];
}) {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="w-full ">
      {media.map((item, index) => {
        const src = getStrapiMedia(item.url);
        if (src) {
          if (item.mime.startsWith('image/')) {
            return (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={item.alternativeText || `Media image ${index + 1}`}
                />
              </div>
            );
          } else if (item.mime.startsWith('video/')) {
            return (
              <div key={index} className="overflow-hidden rounded-lg">
                <video
                  src={src}
                  className="w-full aspect-video object-cover transform"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            );
          }
        }
      })}
    </div>
  );
}
