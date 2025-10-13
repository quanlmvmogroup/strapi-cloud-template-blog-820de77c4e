'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useEffect, useRef, useState } from 'react';

import { BlurImage } from '../blur-image';
import { SearchLineIcon } from '../icons/illustrations';
import { LocaleSwitcher } from '../locale-switcher';
import { NavbarItem } from './navbar-item';
import SearchBox from './search-box';
import { Button } from '@/components/elements/button';
import { Logo } from '@/components/logo';
import { meiliClient } from '@/lib/meilisearch';
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
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus input khi mở
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const index = meiliClient.index('data-catalogue'); // thay "pages" bằng index của bạn
        const res = await index.search(debouncedQuery);
        setResults(res.hits);
      } catch (err) {
        console.error('Meilisearch error:', err);
      }
      setLoading(false);
    };

    search();
  }, [debouncedQuery]);

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
          <div onClick={() => setOpen(true)}>
            <SearchLineIcon className="text-black size-5" />
          </div>
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
      {open && (
        <div className="fixed inset-0 bg-black/10 flex items-start justify-center z-50">
          <div className="mt-40 w-full max-w-3xl overflow-hidden">
            {/* Search bar */}
            <div
              className={cn(
                'flex items-center px-4 py-2 border-b border-gray-200 gap-2 bg-white',
                loading ||
                  (!loading && !results.length && query) ||
                  (!loading && results.length > 0)
                  ? 'rounded-t-xl'
                  : 'rounded-full'
              )}
            >
              <SearchLineIcon className="text-[#717171]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, documents,..."
                className="flex-1 text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                  setResults([]);
                }}
                className="ml-2 p-1 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            {loading && (
              <div className="p-4 text-gray-500 text-center bg-white rounded-b-lg">
                Searching...
              </div>
            )}

            {!loading && results.length > 0 && (
              <ul className="divide-y divide-gray-100 bg-white rounded-b-lg max-h-96 overflow-y-auto">
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      // Ví dụ điều hướng
                      window.location.href = `/${item.slug}`;
                      setOpen(false);
                    }}
                  >
                    <div className="font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.category || 'No category'}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {!loading && !results.length && query && (
              <div className="p-4 text-gray-500 text-center bg-white rounded-b-lg">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
