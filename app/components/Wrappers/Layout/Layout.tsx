import { PropsWithChildren } from 'react';
import Navbar from '~/components/Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* Alert banner */}
      <main>
        <Navbar />
        {children}
      </main>
    </>
  );
};

export default Layout;
