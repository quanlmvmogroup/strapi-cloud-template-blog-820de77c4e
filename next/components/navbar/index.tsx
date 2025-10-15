'use client';

import { motion } from 'framer-motion';

import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

export function Navbar({ data, locale }: { data: any; locale: string }) {
  return (
    <motion.nav className="max-w-7xl mx-auto w-full">
      <div className="w-full h-[68px] grow py-4 pl-10 pr-[34px]">
        {data?.left_navbar_items && (
          <DesktopNavbar
            locale={locale}
            leftNavbarItems={data?.left_navbar_items}
            rightNavbarItems={data?.right_navbar_items}
            logo={data?.logo}
          />
        )}
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        {data?.left_navbar_items && (
          <MobileNavbar
            locale={locale}
            leftNavbarItems={data?.left_navbar_items}
            rightNavbarItems={data?.right_navbar_items}
            logo={data?.logo}
          />
        )}
      </div>
    </motion.nav>
  );
}
