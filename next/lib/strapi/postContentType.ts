import qs from 'qs';

/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {string} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

interface StrapiData {
  id: number;
  [key: string]: any; // Allow for any additional fields
}

interface StrapiResponse {
  data: StrapiData | StrapiData[];
}

export function spreadStrapiData(data: StrapiResponse): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null;
}

export default async function postContentType(
  contentType: string,
  data: Record<string, unknown> = {},
  spreadData?: boolean
): Promise<any> {
  try {
    // Construct the full URL for the API request
    const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);

    // Perform the fetch request with the provided query parameters
    const response = await fetch(`${url.href}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      console.error(
        `Failed to post data to Strapi (url=${url.toString()}, status=${response.status})`
      );
      // Return appropriate fallback based on expected data structure
      return spreadData ? null : { data: [] };
    }
    const jsonData: StrapiResponse = await response.json();
    return spreadData ? spreadStrapiData(jsonData) : jsonData;
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('FetchContentTypeError', error);
    // Return appropriate fallback based on expected data structure
    return spreadData ? null : { data: [] };
  }
}
