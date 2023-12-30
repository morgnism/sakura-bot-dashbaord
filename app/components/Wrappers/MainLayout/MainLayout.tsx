import { PropsWithChildren } from 'react';
import Navbar from '~/components/Navbar';

type MainLayoutProps = {
  className?: string;
};

const MainLayout = ({
  className,
  children,
}: PropsWithChildren<MainLayoutProps>) => (
  <>
    <Navbar />
    <main className={className}>{children}</main>
  </>
);

export default MainLayout;
