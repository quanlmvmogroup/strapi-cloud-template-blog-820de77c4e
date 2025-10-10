import { DataCatalogueItem } from '../data-catalogues/data-catalogues-item';
import { getStrapiMedia } from '../ui/strapi-image';
import { DataCatalogue } from '@/types/types';

export function DataCatalogues({
  data_catalogue,
  locale,
}: {
  data_catalogue: DataCatalogue[];
  locale: string;
}) {
  if (!data_catalogue || data_catalogue.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-10 md:grid-cols-2 my-10">
      {data_catalogue.map((item, index) => (
        <DataCatalogueItem key={index} dataCatalogue={item} locale={locale} />
      ))}
    </div>
  );
}
