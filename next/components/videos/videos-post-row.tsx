'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { formatDate } from 'date-fns';
import FuzzySearch from 'fuzzy-search';
import {
  CalendarCheck,
  CalendarDays,
  ChartBar,
  Play,
  PlayIcon,
  Search,
  Table,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { getStrapiMedia } from '../ui/strapi-image';
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { getYouTubeVideoId } from '@/lib/utils';
import { Video } from '@/types/types';

export const VideoPostRows = ({
  videos,
  locale,
}: {
  videos: Video[];
  locale: string;
}) => {
  const [search, setSearch] = useState('');
  const [openVideo, setOpenVideo] = useState<string | undefined>();

  const searcher = new FuzzySearch(videos, ['title'], {
    caseSensitive: false,
  });

  const [results, setResults] = useState(videos);

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
      </div>

      <div className=" divide-neutral-800 gap-10 mt-6">
        {results.length === 0 ? (
          <p className="text-neutral-400 text-center p-4 w-full">
            No results found
          </p>
        ) : (
          <>
            {results.map((video) => (
              <div key={video.documentId} className="">
                {video.thumbnail && (
                  <div className="w-full aspect-video relative max-h-[500px]">
                    {(video.media?.url || video.youtube_url) && (
                      <button
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-green-50 rounded-full py-2 px-3 hover:bg-opacity-75 transition flex items-center gap-2"
                        onClick={() => {
                          setOpenVideo(video.media?.url ?? video.youtube_url);
                        }}
                      >
                        <PlayIcon className="fill-green-600 stroke-none" />
                        <span className="text-sm text-green-600">
                          Play video
                        </span>
                      </button>
                    )}
                    <Image
                      src={String(getStrapiMedia(video.thumbnail.url))}
                      alt={video.title}
                      className="w-full h-auto rounded-lg"
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                )}
                <h3 className="text-2xl mt-4">{video.title}</h3>
                <div className="flex mt-3">
                  {video.duration && (
                    <div className="bg-[#F4F4F4] py-1 px-2 rounded-full text-xs flex items-center gap-1 text-[#8B9395]">
                      <Play size={16} className="stroke-none fill-black" />
                      {video.duration}
                    </div>
                  )}
                  <div className="bg-[#F4F4F4] py-1 px-2 rounded-full text-xs flex items-center gap-1 text-[#8B9395]">
                    <CalendarDays size={16} className="stroke-black" />
                    {formatDate(new Date(video.createdAt), 'dd/MM/yyyy')}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <Dialog
        open={Boolean(openVideo)}
        onOpenChange={() => setOpenVideo(undefined)}
      >
        <DialogContent className="!bg-white max-w-4xl">
          <DialogTitle></DialogTitle>
          {openVideo?.includes('strapiapp.com') ? (
            <video controls className="w-full aspect-video" src={openVideo} />
          ) : (
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${String(getYouTubeVideoId(openVideo!))}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
