import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { PropsWithChildren } from 'react';
import { IS_DEVELOP } from '~/lib/config';

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
      <body className="flex min-h-screen flex-col bg-slate-900 text-white">
        {children}

        <ScrollRestoration />
        <Scripts />
        {/*Enable live reload in development environment only, not production */}
        {IS_DEVELOP ? <LiveReload /> : null}
      </body>
    </html>
  );
};

export default Document;
