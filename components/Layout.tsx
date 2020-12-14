import Link from 'next/link';
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
    <div>
      <Header title={title} />
      <Nav />
      <div className='flex'>
        <div className='hidden min-h-screen md:block md:w-1/12 lg:w-1/6 bg-fushcia-200'>
          <ul className='mt-8 space-y-5'>
            <li>
              <Link href='#'>
                <a className='flex items-center px-6 space-x-2 md:justify-center lg:justify-start'>
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                    />
                  </svg>
                  <h3 className='hidden lg:block'>Discussion</h3>
                </a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a className='flex items-center px-6 space-x-2 md:justify-center lg:justify-start'>
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                  <h3 className='hidden lg:block'>Messages</h3>
                </a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a className='flex items-center px-6 space-x-2 md:justify-center lg:justify-start'>
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  <h3 className='hidden lg:block'>Users</h3>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='md:w-11/12 lg:w-5/6'>
          <div className='py-6 sm:px-6 lg:px-8'>
            {/* <!-- Replace with your content --> */}
            <div className='px-4 py-6 sm:px-0'>
              <main className=''>{children}</main>
            </div>
            {/* <!-- /End replace --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
