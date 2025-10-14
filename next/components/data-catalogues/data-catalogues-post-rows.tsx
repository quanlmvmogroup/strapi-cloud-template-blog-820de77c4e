'use client';

import { format } from 'date-fns';
import FuzzySearch from 'fuzzy-search';
import { Search } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

import {
  Filter3Line,
  LayoutGridFill,
  ListUnordered,
  SortDesc,
} from '../icons/illustrations';
import { DataCatalogueItem } from './data-catalogues-item';
import { meiliClient } from '@/lib/meilisearch';
import { truncate } from '@/lib/utils';
import { Article, DataCatalogue } from '@/types/types';

export const DataCatalogueRows = ({
  dataCatalogues,
  locale,
}: {
  dataCatalogues: DataCatalogue[];
  locale: string;
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState(dataCatalogues);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const search = async () => {
      try {
        if (debouncedQuery !== '') {
          const index = meiliClient.index('data-catalogue');
          const res = await index.search(debouncedQuery);
          setResults(res.hits as DataCatalogue[]);
        } else {
          setResults(dataCatalogues);
        }
      } catch (err) {
        console.error('Meilisearch error:', err);
      }
    };
    search();
  }, [debouncedQuery]);

  return (
    <div className="w-full py-10">
      <div className="flex sm:flex-row flex-col justify-between gap-2 items-center mb-10">
        <div className="flex gap-2 border border-[#F5F5F5] items-center rounded-full px-3 flex-1">
          <Search className="text-[#717171]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="text-sm min-w-full sm:min-w-96  p-2 border-none  focus:ring-0 focus:outline-none outline-none text-black placeholder-[#717171] w-full"
          />
        </div>
        <div className="bg-black py-2 px-3 flex text-white items-center rounded-full text-xs gap-3 cursor-pointer">
          <SortDesc />
          Most Recent
        </div>
        <div className="bg-black py-2 px-3 flex text-white items-center rounded-full text-xs gap-2">
          <div className="bg-white rounded-full p-1 cursor-pointer">
            <LayoutGridFill className="text-black" />
          </div>
          <div className="rounded-full p-1 cursor-pointer">
            <ListUnordered className="text-white" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex text-sm items-center gap-3">
        <div className="bg-[#F4F4F4] rounded-full py-1 px-2 flex gap-2 items-center">
          <Filter3Line />
          All filters
        </div>
        <div className="w-[1px] h-4 bg-[#EAEAEA]" />
        {['emission', 'climate', 'annual', 'municipal', 'waste'].map((tag) => (
          <div
            key={tag}
            className="bg-[#F4F4F4] rounded-full py-1 px-2 flex gap-2 items-center cursor-pointer"
          >
            #{tag}
          </div>
        ))}
      </div>
      {results.length === 0 ? (
        <p className="text-neutral-400 text-center p-4 mt-10">
          No results found
        </p>
      ) : (
        <div className=" divide-neutral-800 grid md:grid-cols-2 grid-cols-1 gap-10 mt-6">
          {results.map((dataCatalogue, index) => (
            <DataCatalogueItem
              dataCatalogue={dataCatalogue}
              key={dataCatalogue.documentId}
              locale={locale}
              canDownload
              featured={index < 2}
            />
          ))}
        </div>
      )}
    </div>
  );
};
