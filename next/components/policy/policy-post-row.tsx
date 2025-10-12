'use client';

import { formatDate } from 'date-fns';
import FuzzySearch from 'fuzzy-search';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '../elements/button';
import {
  ArrowRightUpLine,
  DownloadLine,
  Filter3Line,
  LayoutGridFill,
  ListUnordered,
  SortDesc,
} from '../icons/illustrations';
import { getStrapiMedia } from '../ui/strapi-image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Media, Policy } from '@/types/types';

const handleDownload = (media: Media) => {
  const link = document.createElement('a');
  link.href = media.url;
  link.download = media.name;
  link.click();
};

const MineType: {
  [key: string]: { icon: string; text: string };
} = {
  'application/pdf': {
    icon: 'pdf.png',
    text: 'PDF',
  },
  'application/msword': {
    icon: 'doc.png',
    text: 'DOC',
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    icon: 'doc.png',
    text: 'DOC',
  },
};

export const PolicyRows = ({
  policies,
  locale,
}: {
  policies: Policy[];
  locale: string;
}) => {
  const [search, setSearch] = useState('');

  const searcher = new FuzzySearch(policies, ['title'], {
    caseSensitive: false,
  });

  const [results, setResults] = useState(policies);

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
            className="text-sm min-w-full sm:min-w-96  p-2 border-none  focus:ring-0 focus:outline-none outline-none  placeholder-[#717171] w-full text-black"
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

      <div className=" divide-neutral-800 gap-10 mt-6">
        {results.length === 0 ? (
          <p className="text-neutral-400 text-center p-4 w-full">
            No results found
          </p>
        ) : (
          <>
            <Table className="rounded-lg mt-4 w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Press</TableHead>
                  <TableHead>Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((policies) => (
                  <TableRow key={policies.documentId}>
                    <TableCell className="max-w-xl">
                      <p>{policies.title}</p>
                      <p className="line-clamp-1 text-sm text-[#A3A3A3]">
                        {policies.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 items-center">
                        <img
                          src={`/mine-types/${MineType[policies.attachment.mime]?.icon}`}
                          alt={MineType[policies.attachment.mime]?.text}
                          width={16}
                          height={16}
                        />
                        <span>{MineType[policies.attachment.mime]?.text}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(policies.publication_date, 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      <a
                        href={String(getStrapiMedia(policies.attachment.url))}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button className="rounded-full bg-green-600 text-sm">
                          View doc <ArrowRightUpLine className="size-5" />
                        </Button>
                      </a>
                    </TableCell>
                    <TableCell>
                      <button
                        className="rounded-full bg-green-50 text-sm p-2 border-0"
                        onClick={() => handleDownload(policies.attachment)}
                      >
                        <DownloadLine className="text-green-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};
