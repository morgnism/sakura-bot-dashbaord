import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import Document from './components/Wrappers/Document';
import Layout from './components/Wrappers/Layout';
import styles from './global.css';
import { authenticator } from './server/auth.server';

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: styles }]),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request);
};

export default function App() {
  return (
    <Document title="My Remix App">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <h1>There was an Error</h1>
        <p>{error?.message}</p>
      </Layout>
    </Document>
  );
}
