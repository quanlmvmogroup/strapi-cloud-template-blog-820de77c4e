import ClientSlugHandler from '../ClientSlugHandler';
import { Container } from '@/components/container';
import { DataCatalogueRows } from '@/components/data-catalogues/data-catalogues-post-rows';
import { AmbientColor } from '@/components/decorations/ambient-color';
import fetchContentType from '@/lib/strapi/fetchContentType';

export default async function DataCatalogues(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const dataCataloguesPage = await fetchContentType(
    'data-catalogue-page',
    {
      filters: { locale: params.locale },
    },
    true
  );

  const dataCatalogues = await fetchContentType(
    'data-catalogues',
    {
      filters: { locale: params.locale },
      sort: ['publishedAt:desc'],
    },
    false
  );

  const localizedSlugs = dataCataloguesPage.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = 'data-catalogue-page';
      return acc;
    },
    { [params.locale]: 'data-catalogue-page' }
  );

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-12">
          <h1
            className="mt-4 w-full max-w-3xl text-5xl text-center"
            dangerouslySetInnerHTML={{
              __html: dataCataloguesPage.heading,
            }}
          ></h1>
        </div>

        <DataCatalogueRows
          dataCatalogues={dataCatalogues.data}
          locale={params.locale}
        />
      </Container>
    </div>
  );
}
