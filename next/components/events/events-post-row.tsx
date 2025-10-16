'use client';

import { formatDate, isAfter } from 'date-fns';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { getStrapiMedia } from '../ui/strapi-image';
import { EventRegistrationForm } from './events-registration-form';
import { meiliClient } from '@/lib/meilisearch';
import { getYouTubeVideoId } from '@/lib/utils';
import { DataCatalogue } from '@/types/types';

export const EventPostRows = ({
  events,
  locale,
}: {
  events: any[];
  locale: string;
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState(events);

  const [openVideo, setOpenVideo] = useState<string | undefined>();
  const [openRegistrationForm, setOpenRegistrationForm] = useState<
    string | undefined
  >();

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
          const index = meiliClient.index('event');
          const res = await index.search(debouncedQuery);
          setResults(res.hits as DataCatalogue[]);
        } else {
          setResults(events);
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
            className="text-sm min-w-full sm:min-w-96  p-2 border-none  focus:ring-0 focus:outline-none outline-none  placeholder-[#717171] w-full text-black"
          />
        </div>
      </div>

      <div className="text-2xl">Other Events</div>

      <div className=" divide-neutral-800 gap-10 mt-6">
        {results.length === 0 ? (
          <p className="text-neutral-400 text-center p-4 w-full">
            No results found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {results.map((event) => {
              const isAfterEvent = isAfter(new Date(), event.start_datetime);

              return (
                <div key={event.id} className="flex gap-4">
                  <div className="w-40 flex-none">
                    <Link href={`/events/${event.slug}`}>
                      <img
                        src={String(getStrapiMedia(event.image.url))}
                        alt={event.image.alternativeText || event.title}
                        className="rounded-lg size-40 object-cover"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="bg-[#F4F4F4] text-black rounded-full py-1 px-2 text-xs">
                        {isAfterEvent ? 'Past Event' : 'Upcoming'}
                      </span>
                    </div>
                    <Link href={`/events/${event.slug}`}>
                      <h3 className="text-sm font-medium">{event.title}</h3>
                    </Link>
                    <p className="text-xs">
                      {formatDate(event.start_datetime, 'do MMMM, yyyy')}
                      {event.end_datetime && (
                        <>
                          <span> - </span>
                          {formatDate(event.end_datetime, 'do MMMM, yyyy')}
                        </>
                      )}
                    </p>
                    <p className="line-clamp-3">{event.description}</p>
                    {isAfterEvent && event.report ? (
                      <div>
                        <a
                          href={String(getStrapiMedia(event.report.url))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 "
                        >
                          View Report
                        </a>
                      </div>
                    ) : (
                      <button
                        className="mt-2 items-center text-xs font-semibold text-green-700 flex gap-2"
                        onClick={(e) => {
                          setOpenRegistrationForm(event.documentId);
                        }}
                      >
                        Register now <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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

      {openRegistrationForm && (
        <EventRegistrationForm
          documentId={openRegistrationForm}
          open={Boolean(openRegistrationForm)}
          onClose={() => setOpenRegistrationForm(undefined)}
          locale={locale}
        />
      )}
    </div>
  );
};
