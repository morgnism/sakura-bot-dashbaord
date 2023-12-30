import { DISCORD_TOKEN } from './config';

export const fetcher = async <T>(
  uri: string,
  { headers, ...options }: RequestInit = {}
): Promise<T> => {
  const headersObject = new Headers(headers);
  const res = await fetch(uri, {
    ...options,
    headers: headersObject,
  });

  if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

  return res.json() || undefined;
};

// =========== Base clients ===========
export const fetchWithBot = <T>(url: string): Promise<T> =>
  fetcher(url, {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });

export const fetchWithUser = <T>(
  url: string,
  accessToken: string
): Promise<T> =>
  fetcher(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
