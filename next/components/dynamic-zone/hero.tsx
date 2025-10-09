'use client';

import Link from 'next/link';

import { Button } from '../elements/button';
import { Heading } from '../elements/heading';
import { Subheading } from '../elements/subheading';

export const Hero = ({
  heading,
  sub_heading,
  CTAs,
  locale,
}: {
  heading: any[];
  sub_heading: any[];
  CTAs: any[];
  locale: string;
}) => {
  return (
    <div>
      <Heading
        as="h1"
        className="text-4xl md:text-4xl lg:text-5xl max-w-3xl mx-auto text-center mt-16 relative z-10  [&_em]:text-primary [&_em]:not-italic font-normal"
      >
        {heading.map(
          (
            part: {
              type: string;
              children: { text: string; type?: string }[];
            },
            index: number
          ) => {
            return (
              <div key={`hero-${index}`}>
                {part.children.map((segment: any, segIndex) => {
                  if (segment.italic) {
                    return <em key={segIndex}>{segment.text}</em>;
                  }
                  if (segment.bold) {
                    return <strong key={segIndex}>{segment.text}</strong>;
                  }
                  return <span key={segIndex}>{segment.text}</span>;
                })}
              </div>
            );
          }
        )}
      </Heading>
      {sub_heading && (
        <Subheading className="text-center mt-2 md:mt-6 text-base md:text-xl   max-w-3xl mx-auto relative z-10 text-[#7F8489]">
          {sub_heading}
        </Subheading>
      )}
      {CTAs && (
        <div className="flex justify-center">
          <div className="flex space-x-2 items-center mt-8">
            {CTAs.map((cta) => (
              <Button
                key={cta?.id}
                as={Link}
                href={`/${locale}${cta.URL}`}
                {...(cta.variant && { variant: cta.variant })}
              >
                {cta.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
