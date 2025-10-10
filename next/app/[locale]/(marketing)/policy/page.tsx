import { type Metadata } from 'next';

import ClientSlugHandler from '../ClientSlugHandler';
import { Container } from '@/components/container';
import { DataCatalogueRows } from '@/components/data-catalogues/data-catalogues-post-rows';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { PolicyRows } from '@/components/policy/policy-post-row';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const pageData = await fetchContentType(
    'policy-page',
    {
      filters: { locale: params.locale },
      populate: 'seo.metaImage',
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Toolkits(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const policyPage = await fetchContentType(
    'policy-page',
    {
      filters: { locale: params.locale },
    },
    true
  );
  const policies = await fetchContentType(
    'policy-document',
    {
      filters: { locale: params.locale },
    },
    false
  );

  console.log('🚀 ~ page.tsx:50 ~ Toolkits ~ policies:', policies);

  const localizedSlugs = policyPage.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = 'policy-page';
      return acc;
    },
    { [params.locale]: 'policy-page' }
  );

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-12">
          <h1 className="mt-4 w-full max-w-3xl text-5xl text-center">
            {policyPage.heading}
          </h1>
          {policyPage.sub_heading && (
            <p className="text-[#8B9395] mt-4">{policyPage.sub_heading}</p>
          )}
        </div>

        <PolicyRows policies={policies.data} locale={params.locale} />
      </Container>
    </div>
  );
}
