import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { SocialsProvider } from 'remix-auth-socials';
import { authenticator } from '~/server/auth.server';
import { returnToCookie } from '~/server/return.server';
import { safeRedirect } from '~/utils/safe-redirect';

export const loader: LoaderFunction = ({ request }) => login(request);
export const action: ActionFunction = ({ request }) => login(request);

const login = async (request: Request) => {
  const url = new URL(request.url);
  const returnTo = safeRedirect(url.searchParams.get('returnTo'));

  try {
    return await authenticator.authenticate(SocialsProvider.DISCORD, request, {
      successRedirect: returnTo,
      failureRedirect: '/',
    });
  } catch (error) {
    if (!returnTo) throw error;
    if (error instanceof Response && isRedirect(error)) {
      error.headers.append(
        'Set-Cookie',
        await returnToCookie.serialize(returnTo)
      );
      return error;
    }
    throw error;
  }
};

function isRedirect(response: Response) {
  if (response.status < 300 || response.status >= 400) return false;
  return response.headers.has('Location');
}
