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
import { truncate } from '@/lib/utils';
import { Article, DataCatalogue } from '@/types/types';

export const DataCatalogueRows = ({
  dataCatalogues,
  locale,
}: {
  dataCatalogues: DataCatalogue[];
  locale: string;
}) => {
  const [search, setSearch] = useState('');

  const searcher = new FuzzySearch(dataCatalogues, ['title'], {
    caseSensitive: false,
  });

  const [results, setResults] = useState(dataCatalogues);
  useEffect(() => {
    const results = searcher.search(search);
    setResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="w-full py-10">
      <div className="flex sm:flex-row flex-col justify-between gap-2 items-center mb-10">
        <div className="flex gap-2 border border-[#F5F5F5] items-center rounded-full px-3 flex-1">
          <Search className="text-[#717171]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

      <div className=" divide-neutral-800 grid md:grid-cols-2 grid-cols-1 gap-10 mt-6">
        {results.length === 0 ? (
          <p className="text-neutral-400 text-center p-4">No results found</p>
        ) : (
          results.map((dataCatalogue, index) => (
            <DataCatalogueItem
              dataCatalogue={dataCatalogue}
              key={dataCatalogue.documentId}
              locale={locale}
              canDownload
              featured={index < 2}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const BlogPostRow = ({ article }: { article: Article }) => {
  return (
    <Link
      href={`blog/${article.slug}`}
      key={`${article.slug}`}
      className="flex md:flex-row flex-col items-start justify-between md:items-center group py-4"
    >
      <div>
        <p className="text-neutral-300 text-lg font-medium group-hover:text-white transition duration-200">
          {article.title}
        </p>
        <p className="text-neutral-300 text-sm mt-2 max-w-xl group-hover:text-white transition duration-200">
          {truncate(article.description, 80)}
        </p>

        <div className="flex gap-2 items-center my-4">
          <p className="text-neutral-300 text-sm  max-w-xl group-hover:text-white transition duration-200">
            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
          </p>
          <div className="h-1 w-1 rounded-full bg-neutral-800"></div>
          <div className="flex gap-4 flex-wrap ">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="text-xs font-bold text-muted px-2 py-1 rounded-full bg-neutral-800 capitalize"
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* <Image
        src={blog.authorAvatar}
        alt={blog.author}
        width={40}
        height={40}
        className="rounded-full md:h-10 md:w-10 h-6 w-6 mt-4 md:mt-0 object-cover"
      /> */}
    </Link>
  );
};
