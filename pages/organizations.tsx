import { FC } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { OrgProps } from 'types';

type Props = {
  organizations: OrgProps[];
};

const Organizations: FC<Props> = ({ organizations }) => {
  return (
    <Layout title='Organizations'>
      <section className='px-4 pt-4 pb-4 space-y-4 sm:px-6 lg:px-4 xl:px-6 sm:pb-6 lg:pb-4 xl:pb-6'>
        <header className='flex items-center justify-between'>
          <h2 className='text-lg font-medium leading-6 text-black'>
            Organizations
          </h2>
          <button className='flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 hover:text-blue-800 group'>
            <svg
              className='mr-2 group-hover:text-blue-600text-blue-500'
              width='12'
              height='20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z'
              />
            </svg>
            New
          </button>
        </header>
        <form className='relative'>
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            />
          </svg>
          <input
            className='w-full py-2 pl-10 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
            type='text'
            aria-label='Filter organizations'
            placeholder='Filter organizations'
          />
        </form>
        <ul className='grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
          {organizations.map((org) => (
            <li key={org.id} className=''>
              <a className='block p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-br from-green-400 to-cyan-500 hover:border-transparent hover:shadow-lg group'>
                <Image
                  className='bg-cover rounded-lg '
                  src={org.logo}
                  alt={org.name}
                  width='400'
                  height='200'
                  layout='responsive'
                />
                <dl className='grid items-center grid-cols-2 grid-rows-2 sm:block lg:grid xl:block'>
                  <div>
                    <dt className='sr-only'>Name</dt>
                    <dd className='font-medium leading-6 text-black group-hover:text-white'>
                      {org.name}
                    </dd>
                  </div>
                  <div>
                    <dt className='sr-only'>Phone</dt>
                    <dd className='text-sm font-medium group-hover:text-blue-200 sm:mb-4 lg:mb-0 xl:mb-4'>
                      {org.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className='sr-only'>Website</dt>
                    <dd className='text-sm font-medium group-hover:text-blue-200 sm:mb-4 lg:mb-0 xl:mb-4'>
                      {org.website}
                    </dd>
                  </div>
                  <div className='col-start-2 row-start-1 row-end-3 '>
                    <dt className='sr-only'>Users</dt>
                    <dd className='flex justify-end -space-x-2 sm:justify-start lg:justify-end xl:justify-start'>
                      {org.users.map((user) => (
                        <img
                          key={user.id}
                          src={user.image}
                          alt={user.name}
                          // width='48'
                          // height='48'
                          className='w-10 h-10 bg-gray-100 border-2 border-white rounded-full'
                        />
                      ))}
                    </dd>
                  </div>
                </dl>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const organizations = await prisma.organization.findMany({
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  return {
    props: { organizations },
    revalidate: 1,
  };
};

export default Organizations;
