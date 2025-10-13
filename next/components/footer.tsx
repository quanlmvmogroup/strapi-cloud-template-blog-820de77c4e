import { MailIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React from 'react';
import Markdown from 'react-markdown';

import { MailFill, PlanetLine } from './icons/illustrations';
import { LocaleSwitcher } from './locale-switcher';
import { Logo } from '@/components/logo';

export const Footer = async ({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) => {
  return (
    <div className="relative mt-32">
      <div className="bg-green-700 rounded-t-[20px] py-10 px-16">
        <div className="max-w-7xl mx-auto text-sm flex sm:flex-row flex-col justify-between items-start text-white">
          <div>
            <div className="mr-4  md:flex mb-4">
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>
            {data.email && (
              <div className="text-xs flex gap-2 mb-3">
                <div className="bg-white size-4 rounded-full flex items-center justify-center">
                  <MailFill />
                </div>
                <div className="font-medium">{data.email}</div>
              </div>
            )}
            {data.email && (
              <div className="text-xs flex gap-2">
                <div className="bg-white size-4 rounded-full flex items-center justify-center">
                  <PlanetLine />
                </div>
                <div className="font-medium">{data.website}</div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-24 items-start mt-10 md:mt-0">
            {data?.links_1 && data?.links_1.length > 0 && (
              <div>
                <div className="text-white/70 text-lg font-medium">
                  Resources
                </div>
                <LinkSection links={data?.links_1} locale={locale} />
              </div>
            )}
            {data?.links_2 && data?.links_2.length > 0 && (
              <div>
                <div className="text-white/70 text-lg font-medium">Company</div>
                <LinkSection links={data?.links_2} locale={locale} />
              </div>
            )}
            {data?.links_3 && data?.links_3.length > 0 && (
              <div>
                <div className="text-white/70 text-lg font-medium">Legal</div>
                <LinkSection links={data?.links_3} locale={locale} />
              </div>
            )}
          </div>
        </div>
        <div className="mb-6 mt-12 max-w-7xl mx-auto text-sm flex sm:flex-row flex-col justify-between items-start text-white">
          <LocaleSwitcher currentLocale={locale} />
        </div>
        <div className=" border-white/30 border-t-[0.5px] max-w-7xl mx-auto text-sm flex sm:flex-row flex-col justify-between items-start text-white">
          <div className=" text-white text-xs font-medium mt-6">
            <Markdown>{data?.copyright}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkSection = ({
  links,
  locale,
}: {
  links: { text: string; URL: never | string }[];
  locale: string;
}) => (
  <div className="flex justify-center space-y-4 flex-col mt-4">
    {links.map((link) => (
      <Link
        key={link.text}
        className="transition-colors hover:text-neutral-400 text-white  text-lg font-medium"
        href={`${link.URL?.startsWith('http') ? '' : `/${locale}`}${link.URL ?? ''}`}
      >
        {link.text}
      </Link>
    ))}
  </div>
);
