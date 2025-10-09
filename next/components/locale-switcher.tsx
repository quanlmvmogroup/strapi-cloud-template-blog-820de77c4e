'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useSlugContext } from '@/app/context/SlugContext';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const { state } = useSlugContext();
  const { localizedSlugs } = state;

  const pathname = usePathname(); // Current path
  const segments = pathname.split('/'); // Split path into segments

  // Generate localized path for each locale
  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`; // Default to root path for the locale

    // Handle homepage (e.g., "/en" -> "/fr")
    if (segments.length <= 2) {
      return `/${locale}`;
    }

    // Handle dynamic paths (e.g., "/en/blog/[slug]")
    if (localizedSlugs[locale]) {
      segments[1] = locale; // Replace the locale
      segments[segments.length - 1] = localizedSlugs[locale]; // Replace slug if available
      return segments.join('/');
    }

    // Fallback to replace only the locale
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex gap-2 p-1 rounded-md">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 items-center">
            <img
              src={`/flags/${currentLocale}.png`}
              alt={currentLocale}
              className="size-4 flex-none"
            />
            {currentLocale.toUpperCase()}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!pathname.includes('/products/') &&
            Object.keys(localizedSlugs).map((locale) => (
              <DropdownMenuItem key={locale}>
                <Link
                  key={locale}
                  href={generateLocalizedPath(locale)}
                  className="flex gap-2"
                >
                  <img
                    src={`/flags/${locale}.png`}
                    alt={locale}
                    className="size-4 flex-none"
                  />
                  {locale.toUpperCase()}
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
