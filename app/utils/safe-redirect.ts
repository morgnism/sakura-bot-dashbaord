import { AppRoutes } from '~/lib/route';

/**
 * Use for authenticated, protected routes. Redirects the user
 * back to the protected route they were originally trying to access.
 * This also avoids open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = AppRoutes.HOME
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect;
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect;
  }

  return to;
}
