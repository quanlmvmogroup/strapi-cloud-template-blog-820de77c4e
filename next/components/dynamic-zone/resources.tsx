import { sub } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { DataCatalogueItem } from '../data-catalogues/data-catalogues-item';
import { ArrowRightUpLine } from '../icons/illustrations';
import { getStrapiMedia } from '../ui/strapi-image';
import { DataCatalogue } from '@/types/types';

export function Resources({
  heading,
  resources,
  readmore,
  sub_heading,
  locale,
}: {
  heading: string;
  sub_heading: string;
  resources: {
    title: string;
    documentId: string;
  }[];
  locale: string;
  readmore: {
    text: string;
    URL: string;
  };
}) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-green-100 rounded-3xl p-10 flex justify-between gap-44 my-24">
      <div className="w-72">
        <div className="text-3xl font-medium">{heading}</div>
        <div className="text-xs text-[#7F8489] mt-2">{sub_heading}</div>
        {readmore && (
          <div className="mt-4">
            <Link
              href={`/${locale}${readmore.URL}`}
              className="text-green-700 flex gap-2 items-center text-base font-medium"
            >
              {readmore.text} <ArrowRight className="size-6" />
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1 flex gap-y-5 flex-col">
        {resources.map((item, index) => (
          <Link
            href={`/${locale}${item.documentId}`}
            className="flex gap-2 items-center justify-between text-2xl flex-1 border-b border-[#FCFCFC] pb-2"
            key={`resource-${item.documentId}`}
          >
            <span>{item.title}</span>
            <ArrowRightUpLine className="size-6" />
          </Link>
        ))}
      </div>
    </div>
  );
}
