import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { PropsWithChildren } from 'react';

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

export default Document;
