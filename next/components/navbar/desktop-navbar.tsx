'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Link } from 'next-view-transitions';
import { useState } from 'react';

import { BlurImage } from '../blur-image';
import { SearchLineIcon } from '../icons/illustrations';
import { LocaleSwitcher } from '../locale-switcher';
import { NavbarItem } from './navbar-item';
import { Button } from '@/components/elements/button';
import { Logo } from '@/components/logo';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { cn } from '@/lib/utils';

type Props = {
  leftNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  rightNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: any;
  locale: string;
};

export const DesktopNavbar = ({
  leftNavbarItems,
  rightNavbarItems,
  logo,
  locale,
}: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row gap-2 items-center">
        <Link
          href={`/${locale || 'en'}`}
          className="font-normal flex space-x-2 items-center text-sm mr-4 text-black relative z-20"
        >
          <BlurImage
            src={strapiImage(logo?.image?.url)}
            width={36}
            height={36}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full border border-[#F5F5F5] p-1">
          {leftNavbarItems.map((item) => (
            <NavbarItem
              href={`/${locale}${item.URL}` as never}
              key={item.text}
              target={item.target}
            >
              {item.text}
            </NavbarItem>
          ))}
        </div>
        <div className="rounded-full border border-[#F5F5F5] p-2 hover:bg-[#F5F5F5] cursor-pointer">
          <SearchLineIcon className="text-black size-5" />
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <LocaleSwitcher currentLocale={locale} />

        {rightNavbarItems.map((item, index) => (
          <Button
            key={item.text}
            variant={
              index === rightNavbarItems.length - 1 ? 'primary' : 'simple'
            }
            as={Link}
            href={`/${locale}${item.URL}`}
            className="rounded-full"
          >
            {item.text}
          </Button>
        ))}
      </div>
    </div>
  );
};
