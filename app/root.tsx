import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import Document from './components/Wrappers/Document';
import MainLayout from './components/Wrappers/MainLayout';
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
