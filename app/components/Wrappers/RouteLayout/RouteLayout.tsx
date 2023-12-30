import { PropsWithChildren } from 'react';

type RouteLayoutProps = {
  className?: string;
};

const RouteLayout = ({
  className,
  children,
}: PropsWithChildren<RouteLayoutProps>) => (
  <main className={className}>{children}</main>
);

export default RouteLayout;
