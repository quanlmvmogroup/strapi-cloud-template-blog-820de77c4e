import { format, parse } from 'date-fns';
import Markdown from 'react-markdown';

import ClientSlugHandler from '../../ClientSlugHandler';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { getStrapiMedia } from '@/components/ui/strapi-image';
import fetchContentType from '@/lib/strapi/fetchContentType';

export default async function EventPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;

  const event = await fetchContentType(
    'events',
    {
      filters: { locale: params.locale, slug: params.slug },
    },
    true
  );

  const localizedSlugs = event.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = localization.slug;
      return acc;
    },
    { [params.locale]: params.slug }
  );

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-12">
          <h1 className="mt-4 w-full text-5xl text-center">{event.title}</h1>
        </div>
        <img
          src={String(getStrapiMedia(event.image.url))}
          alt={event.image.alternativeText || event.title}
          className="w-full rounded-lg"
        />
        <div className="mt-10">{event.description}</div>
        <div className="w-full px-10">
          {event.agenda?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl mb-4">Agenda</h2>
              <div className="flex flex-col gap-10">
                {event.agenda.map((agenda: any, index: number) => (
                  <div key={index} className="mb-2">
                    <div className="font-semibold text-lg">
                      Day{index + 1}: {agenda.title}
                    </div>
                    <div className="flex gap-2">
                      {agenda.highlight_video && (
                        <a
                          href={String(
                            getStrapiMedia(agenda.highlight_video.url)
                          )}
                          className="text-blue-500"
                        >
                          [Highlight video]
                        </a>
                      )}
                      {agenda.video_recordings_url && (
                        <a
                          href={agenda.video_recordings_url}
                          className="text-blue-500"
                        >
                          [Video recordings]
                        </a>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      {agenda.items?.map((item: any, idx: number) => {
                        const parsedStartTime = parse(
                          item.start_time,
                          'HH:mm:ss.SSS',
                          new Date()
                        );
                        const parsedEndTime = parse(
                          item.start_time,
                          'HH:mm:ss.SSS',
                          new Date()
                        );

                        return (
                          <div key={idx} className="mt-2 flex gap-4 w-full">
                            <div className="w-44 flex-none">
                              {format(parsedStartTime, 'hh:mm aaa')} -{' '}
                              {format(parsedEndTime, 'hh:mm aaa')}
                            </div>
                            <div className="grow">
                              <div className="text-lg text-green-700 font-semibold">
                                {item.title}
                              </div>
                              <div className="[&_ul]:list-disc ml-8">
                                <Markdown>{item.description}</Markdown>
                              </div>
                            </div>
                          </div>
                        );
                      }) || <div></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
