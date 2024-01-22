import { PropsWithChildren } from 'react';

type ErrorLayoutProps = { header: string };

const ErrorLayout = ({
  header,
  children,
}: PropsWithChildren<ErrorLayoutProps>) => (
  <div className="grid gap-6">
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{header}</h2>
      </div>
      <div className="text-zinc-400">{children}</div>
    </div>
  </div>
);

export default ErrorLayout;
