import useSWR from 'swr';
import { useSession } from 'next-auth/client';

import Header from './Header';
import Nav from './Nav';
import { ReactNode } from 'react';

export default function Layout({
  title = 'Home',
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const [session, loading] = useSession();

  return (
    <div className=''>
      <Nav />
      <Header title={title} />
      <main>
        <div className='py-6 sm:px-6 lg:px-8'>
          {/* <!-- Replace with your content --> */}
          <div className='px-4 py-6 sm:px-0'>
            <main className=''>{children}</main>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  );
}
