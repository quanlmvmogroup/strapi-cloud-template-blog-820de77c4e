'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../elements/button';
import { Heading } from '../elements/heading';
import { Subheading } from '../elements/subheading';
import { getStrapiMedia, StrapiImage } from '../ui/strapi-image';
import { formatDate, isAfter } from 'date-fns';
import { EventRegistrationForm } from '../events/events-registration-form';
import { useState } from 'react';

export const Event = ({
    heading,
    sub_heading,
    cta,
    locale,
    events
}: {
    heading: string;
    sub_heading: string;
    cta: {
        id: string,
        text: string,
        URL: string,
        target: string,
        variant: any
    };
    locale: string;
    events: any[]
}) => {

    const [openRegistrationForm, setOpenRegistrationForm] = useState<string | undefined>();

    return (
        <div className="mb-24">
            <Heading
                as="h1"
                className="text-3xl max-w-3xl mx-auto text-center mt-24 relative"
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: heading,
                    }}
                />
            </Heading>
            {sub_heading && (
                <Subheading className="text-center my-3 text-base max-w-3xl mx-auto relative z-10 text-[#7F8489] [&_h4]:!text-base [&_h4]:!-mt-3">
                    {sub_heading}
                </Subheading>
            )}
            {cta && (
                <div className="flex justify-center">
                    <div className="flex space-x-2 items-center">
                        <Button
                            key={cta?.id}
                            as={Link}
                            href={`/${locale}${cta.URL}`}
                            {...(cta.variant && { variant: cta.variant })}
                            className="rounded-full !text-xs !bg[#189548] py-3 px-5"
                        >
                            {cta.text}
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[42px] items-start mt-12">
                {events.length > 0 && (
                    <div key={events[0].id} className="relative rounded-3xl overflow-hidden md:row-span-2">
                        <Link href={`/events/${events[0].slug}`}>
                            <img
                                src={String(getStrapiMedia(events[0].image.url))}
                                alt={events[0].image.alternativeText}
                                className="min-h-[497px] object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-6 left-10 right-6 text-white">
                                <span className="bg-[#F4F4F4] text-black px-2 py-1 rounded-3xl text-xs">
                                    {isAfter(new Date(), events[0].start_datetime) ? 'Past Event' : 'Upcoming'}
                                </span>
                                <p className="text-2xl mt-1">{events[0].title}</p>
                                <p className="text-sm opacity-80 mt-1 line-clamp-2">{events[0].description}</p>

                                {isAfter(new Date(), events[0].start_datetime) && events[0].report ? (
                                    <a
                                        href={String(getStrapiMedia(events[0].report.url))}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center text-base font-medium text-white"
                                    >
                                        View Report  <ArrowRight size={24} />
                                    </a>
                                ) : (
                                    <button
                                        className="mt-6 inline-flex items-center text-base font-medium text-white"
                                        onClick={(e) => { e.preventDefault(); setOpenRegistrationForm(events[0].documentId) }}
                                    >
                                        Register now <ArrowRight size={24} className="ml-2" />
                                    </button>
                                )}
                            </div>
                        </Link>
                    </div>
                )}

                <div className="flex flex-col gap-10">
                    {events.slice(1).map((event) => {
                        const isAfterEvent = isAfter(new Date(), event.start_datetime);

                        return (
                            <div key={event.id} className="flex gap-4 bg-white px-4 py-3 rounded-xl">
                                <div className="w-40 flex-none">
                                    <Link href={`/events/${event.slug}`}>
                                        <img
                                            src={String(getStrapiMedia(event.image.url))}
                                            alt={event.image.alternativeText || event.title}
                                            className="rounded-lg h-full object-cover"
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div>
                                        <span className="bg-[#F4F4F4] text-black rounded-3xl py-1 px-2 text-xs">
                                            {isAfterEvent ? 'Past Event' : 'Upcoming'}
                                        </span>
                                    </div>
                                    <Link href={`/events/${event.slug}`}>
                                        <h3 className="text-sm font-medium">{event.title}</h3>
                                    </Link>
                                    <p className="text-xs">
                                        {formatDate(event.start_datetime, 'do MMMM, yyyy')}
                                    </p>
                                    <p className="line-clamp-3 text-xs opacity-70">{event.description}</p>
                                    {isAfterEvent && event.report ? (
                                        <div>
                                            <a
                                                href={String(getStrapiMedia(event.report.url))}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 items-center text-xs font-medium text-green-700 flex gap-2"
                                            >
                                                View Report <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    ) : (
                                        <button
                                            className="mt-1 items-center text-xs font-medium text-green-700 flex gap-2"
                                            onClick={() => setOpenRegistrationForm(event.documentId)}
                                        >
                                            Register now <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {openRegistrationForm && (
                <EventRegistrationForm
                    documentId={openRegistrationForm}
                    open={Boolean(openRegistrationForm)}
                    onClose={() => setOpenRegistrationForm(undefined)}
                />
            )}
        </div>
    );
};
