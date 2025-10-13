'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../elements/button';
import { Heading } from '../elements/heading';
import { Subheading } from '../elements/subheading';
import { StrapiImage } from '../ui/strapi-image';
import { Media } from '@/types/types';

export const Hero = ({
  heading,
  sub_heading,
  CTAs,
  locale,
  readmore,
  partners,
  image,
}: {
  heading: string;
  sub_heading: string;
  CTAs: any[];
  locale: string;
  readmore: {
    text: string;
    URL: string;
  };
  partners: {
    name: string;
    logo: any;
    website: string;
    documentId: string;
  }[];
  image?: Media;
}) => {
  return (
    <div className="mb-12">
      {image && (
        <div className="relative size-20 mx-auto mt-10">
          <StrapiImage
            src={image.url}
            layout="fill"
            objectFit="cover"
            alt={heading}
          />
        </div>
      )}
      <Heading
        as="h1"
        className="text-4xl md:text-4xl lg:text-5xl max-w-3xl mx-auto text-center mt-16 relative z-10  [&_a]:text-primary font-normal [&_h3]:text-3xl"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: heading,
          }}
        />
      </Heading>
      {sub_heading && (
        <Subheading className="text-center mt-2 md:mt-5 text-base md:text-xl max-w-3xl mx-auto relative z-10 text-[#7F8489] [&_h4]:!text-base [&_h4]:!-mt-3">
          {sub_heading}
        </Subheading>
      )}
      {CTAs && CTAs.length > 0 && (
        <div className="flex justify-center">
          <div className="flex space-x-2 items-center mt-8">
            {CTAs.map((cta) => (
              <Button
                key={cta?.id}
                as={Link}
                href={`/${locale}${cta.URL}`}
                {...(cta.variant && { variant: cta.variant })}
                className="rounded-full !text-xs !bg[#189548] py-3 px-5"
              >
                {cta.text}
              </Button>
            ))}
          </div>
        </div>
      )}
      {readmore && (
        <div className="text-center mt-4">
          <Link
            href={`/${locale}${readmore.URL}`}
            className="text-green-700 flex gap-2 items-center justify-center text-base font-medium"
          >
            {readmore.text} <ArrowRight />
          </Link>
        </div>
      )}
      {partners && partners.length > 0 && (
        <div className="grid-cols-3 grid gap-12 mt-12">
          {partners.map((partner) => (
            <Link
              href={partner.website ?? '#'}
              className="rounded-lg bg-[#F9FAFA] py-3 px-5 flex items-center gap-4 border-1 border-[#F9FAFA]"
              target="_blank"
              key={`partner-${partner.documentId}`}
            >
              <div className="rounded-lg flex items-center justify-center size-12 flex-none bg-white">
                <StrapiImage
                  src={partner.logo.url}
                  width={32}
                  height={32}
                  alt={`${partner.name}`}
                />
              </div>
              <span className="text-base">{partner.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
