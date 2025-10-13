import { type Metadata } from 'next';

import ClientSlugHandler from '../ClientSlugHandler';
import { Container } from '@/components/container';
import { DataCatalogueRows } from '@/components/data-catalogues/data-catalogues-post-rows';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { PolicyRows } from '@/components/policy/policy-post-row';
import { VideoPostRows } from '@/components/videos/videos-post-row';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';

export default async function Events(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const eventsPage = await fetchContentType(
    'event-page',
    {
      filters: { locale: params.locale },
    },
    true
  );
  const videos = await fetchContentType(
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

        <VideoPostRows videos={videos.data} locale={params.locale} />
      </Container>
    </div>
  );
}
