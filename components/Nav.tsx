import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/client';

import { ActiveLink } from './ActiveLink';
import { ProfileImage } from './ProfileImage';

import { baseUrl } from 'utils/baseUrl';
import { menuProps, menus } from 'utils/menuNav';

export default function Nav() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleClick = () => {
    setIsOpen((t) => !t);
  };

  const handleSignIn = () => {
    signIn('auth0', { callbackUrl: `${baseUrl}/dashboard` });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: `${process.env.BASE_URL}` });
  };

  return (
    <div>
      <nav className='bg-gray-800'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <Link href='/'>
                <a className='flex-shrink-0'>
                  <img
                    className='w-8 h-8'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                    alt='Workflow'
                  />
                </a>
              </Link>
              <div className='hidden md:block'>
                <div className='flex items-baseline ml-10 space-x-4'>
                  {!session ? (
                    <ActiveLink href='/'>
                      <a
                        className={`px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white' ${
                          router.pathname === '/' ? 'bg-gray-900' : ''
                        }`}>
                        Home
                      </a>
                    </ActiveLink>
                  ) : (
                    <ActiveLink href='/dashboard'>
                      <a
                        className={`px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white' ${
                          router.pathname === '/dashboard' ? 'bg-gray-900' : ''
                        }`}>
                        Dashboard
                      </a>
                    </ActiveLink>
                  )}
                  {menus.map((menu: menuProps) => (
                    <div key={menu.id}>
                      <ActiveLink href={menu.path}>
                        <a
                          className={`px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white' ${
                            router.pathname === menu.path ? 'bg-gray-900' : ''
                          }`}>
                          {menu.title}
                        </a>
                      </ActiveLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {!session ? (
              <button
                type='button'
                onClick={handleSignIn}
                className='hidden px-4 py-2 text-sm font-medium text-gray-300 transition duration-150 ease-out rounded-md md:block hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                LOGIN
              </button>
            ) : (
              <div className='hidden md:block'>
                <div className='flex items-center ml-4 md:ml-6'>
                  <button className='p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                    <span className='sr-only'>View notifications</span>
                    <svg
                      className='w-6 h-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                  </button>
                  <div className='relative ml-3'>
                    <div>
                      <button
                        type='button'
                        onClick={toggleClick}
                        className='flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        id='user-menu'
                        aria-haspopup='true'>
                        <span className='sr-only'>Open user menu</span>
                        <ProfileImage
                          src={session.user.image}
                          alt={session.user.name}
                          width={36}
                          height={36}
                          layout='fixed'
                        />
                      </button>
                    </div>
                    {/* Desktop View */}
                    <Transition
                      show={isOpen}
                      enter='transition ease-out duration-100 transform'
                      enterFrom='opacity-0 scale-95'
                      enterTo='opacity-100 scale-100'
                      leave='transition ease-in duration-75 transform'
                      leaveFrom='opacity-100 scale-100'
                      leaveTo='opacity-0 scale-95'>
                      {(ref) => (
                        <div
                          ref={ref}
                          className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='user-menu'>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            role='menuitem'>
                            Your Profile
                          </a>

                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            role='menuitem'>
                            Settings
                          </a>

                          <Link href='/'>
                            <a
                              onClick={handleSignOut}
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                              role='menuitem'>
                              Sign out
                            </a>
                          </Link>
                        </div>
                      )}
                    </Transition>
                  </div>
                </div>
              </div>
            )}
            <div className='flex -mr-2 md:hidden'>
              <button
                type='button'
                onClick={toggleClick}
                className='inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span className='sr-only'>Open main menu</span>
                {isOpen ? (
                  <svg
                    className='block w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                ) : (
                  <svg
                    className='block w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='false'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'>
          {(ref) => (
            <div ref={ref} className='md:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                {!session ? (
                  <Link href='/dashboard'>
                    <a className='block px-3 py-2 text-base font-medium text-gray-300 bg-gray-900 rounded-md'>
                      Home
                    </a>
                  </Link>
                ) : (
                  <Link href='/dashboard'>
                    <a className='block px-3 py-2 text-base font-medium text-gray-300 bg-gray-900 rounded-md'>
                      Dashboard
                    </a>
                  </Link>
                )}

                <Link href='/articles'>
                  <a className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700'>
                    Articles
                  </a>
                </Link>

                <Link href='/events'>
                  <a className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700'>
                    Events
                  </a>
                </Link>

                <Link href='/members'>
                  <a className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700'>
                    Members
                  </a>
                </Link>

                <Link href='/reports'>
                  <a className='block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700'>
                    Reports
                  </a>
                </Link>
                {!session ? (
                  <button
                    type='button'
                    onClick={handleSignIn}
                    className='block py-4 mx-auto text-lg font-medium text-gray-400 bg-gray-900 rounded-lg focus:outline-none px-44 hover:text-gray-300 hover:bg-gray-700'>
                    <h2>Login</h2>
                  </button>
                ) : (
                  <div className='pt-4 pb-3 border-t border-gray-700'>
                    <div className='flex items-center px-5'>
                      <div className='flex-shrink-0'>
                        <ProfileImage
                          src={session.user.image}
                          alt={session.user.name}
                          width={36}
                          height={36}
                          layout='fixed'
                        />
                      </div>
                      <div className='ml-3 space-y-1'>
                        <div className='text-base font-medium leading-none text-gray-400'>
                          {session.user.name}
                        </div>
                        <div className='text-sm font-medium leading-none text-gray-400'>
                          {session.user.email}
                        </div>
                      </div>
                      <button className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>View notifications</span>
                        <svg
                          className='w-6 h-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='px-2 mt-3 space-y-1'>
                      <a
                        href='#'
                        className='block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700'>
                        Your Profile
                      </a>

                      <a
                        href='#'
                        className='block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700'>
                        Settings
                      </a>

                      <Link href='/'>
                        <a
                          onClick={handleSignOut}
                          className='block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700'>
                          Sign out
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
