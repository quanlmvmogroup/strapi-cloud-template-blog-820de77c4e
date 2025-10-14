import { isAfter } from 'date-fns';
import Link from 'next/link';

import ClientSlugHandler from '../ClientSlugHandler';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { EventPostRows } from '@/components/events/events-post-row';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getStrapiMedia } from '@/components/ui/strapi-image';
import fetchContentType from '@/lib/strapi/fetchContentType';

export default async function Events(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const eventsPage = await fetchContentType(
    'event-page',
    {
      filters: { locale: params.locale },
    },
    true
  );
  const events = await fetchContentType(
    'events',
    {
      filters: { locale: params.locale },
    },
    false
  );

  const localizedSlugs = eventsPage.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = 'event-page';
      return acc;
    },
    { [params.locale]: 'event-page' }
  );

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-12">
          <h1 className="mt-4 w-full text-5xl text-center">
            {eventsPage.heading}
          </h1>
          {eventsPage.sub_heading && (
            <p className="text-[#8B9395] mt-4">{eventsPage.sub_heading}</p>
          )}
        </div>
        {eventsPage.events.length > 0 && (
          <Carousel className="relative">
            <CarouselContent>
              {eventsPage.events.map((event: any) => {
                const isAfterEvent = isAfter(new Date(), event.start_datetime);
                return (
                  <CarouselItem
                    key={event.id}
                    className="overflow-hidden rounded-lg"
                  >
                    <div className="relative">
                      <div className="absolute text-white w-1/2 left-1/2 top-1/2 -translate-y-1/2 pl-20 pr-10 flex flex-col gap-1">
                        <div>
                          <span className="bg-white text-black rounded-full py-1 px-2 text-xs">
                            {isAfterEvent ? 'Past Event' : 'Upcoming'}
                          </span>
                        </div>
                        <Link href={`/events/${event.slug}`}>
                          <div className="text-2xl">{event.title}</div>
                        </Link>
                        <div className="line-clamp-4 text-sm">
                          {event.description}
                        </div>
                        {isAfterEvent && event.report && (
                          <div>
                            <a
                              href={String(getStrapiMedia(event.report.url))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 "
                            >
                              View Report
                            </a>
                          </div>
                        )}
                      </div>
                      <img
                        src={String(getStrapiMedia(event.image.url))}
                        alt={event.image.alternativeText || event.title}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-3 !bg-black/100 !opacity-100 text-white" />
            <CarouselNext className="right-3 !bg-black/100 !opacity-100 text-white" />
          </Carousel>
        )}

        <EventPostRows events={events.data} locale={params.locale} />
      </Container>
    </div>
  );
}
