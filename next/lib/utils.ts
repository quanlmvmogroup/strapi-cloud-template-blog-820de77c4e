import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

export const formatNumber = (
  number: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const getYouTubeVideoId = (url: string): string | null => {
  try {
    const u = new URL(url);

    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') {
        return u.searchParams.get('v');
      }

      const liveMatch = u.pathname.match(/^\/live\/([^/]+)/);
      if (liveMatch) {
        return liveMatch[1] ?? null;
      }

      // Trường hợp /embed/VIDEO_ID
      const embedMatch = u.pathname.match(/^\/embed\/([^/]+)/);
      if (embedMatch) {
        return embedMatch[1] ?? null;
      }
    }

    if (u.hostname === 'youtu.be') {
      console.log('🚀 ~ utils.ts:46 ~ getYouTubeVideoId ~ u:', u.pathname);
      return u.pathname.split('/')[1] ?? null;
    }

    return null;
  } catch {
    return null;
  }
};
