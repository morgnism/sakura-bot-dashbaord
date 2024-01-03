import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { PropsWithChildren } from 'react';
import MainLayout from './components/MainLayout';
import styles from './global.css';
import { authenticator } from './server/auth.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request);
};

export default function App() {
  return (
    <Document title="My Remix App">
      {/* Alert banner */}
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log('ErrorBoundary', error);
  return (
    <Document>
      <MainLayout>
        <h1>There was an Error</h1>
        <p>{error?.message}</p>
      </MainLayout>
    </Document>
  );
}

const Document = ({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {title ? <title>{title}</title> : null}
      </head>
      <body className="bg-slate-900 text-white">
        {children}

        <ScrollRestoration />
        <Scripts />
        {/*Enable live reload in development environment only, not production */}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
};
