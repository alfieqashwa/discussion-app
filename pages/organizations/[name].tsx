// source: https://github.com/leerob/next-prisma/blob/master/pages/songs/%5Bid%5D.js

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import prisma from 'lib/prisma';
import Layout from 'components/Layout';
import { replaceSpaceToDash, replaceDashToSpace } from 'lib/replaceString';

const data = {
  id: 4,
  email: 'komunitas.kretekindonesia@gmail.com',
  name: 'Komunitas Kretek Indonesia',
  address: 'Jl. Cendrawasih Komp Diknas Cipayung-Ciputat',
  phone: '+62-813-1980-555-555',
  website: 'https://komunitaskretekindonesia.id',
  logo:
    'https://images.unsplash.com/photo-1440504738219-a74a11143d50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  users: [
    {
      id: 1,
      name: 'alfieqashwa',
      email: 'alfieqashwa@gmail.com',
      image:
        'https://s.gravatar.com/avatar/5871c89bb1b2cae63c7b2bfdea17fd62?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fal.png',
      role: 'USER',
    },
  ],
};

const Organization = ({ org }) => {
  return (
    <Layout>
      <section className='py-12 overflow-x-hidden md:py-32'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-wrap lg:flex-nowrap'>
            <div className='w-full lg:w-1/2'>
              <div className='py-6 lg:pr-32'>
                <div className='mb-4'>
                  <span className='px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl'>
                    Organization
                  </span>
                  <h2 className='mt-3 text-3xl font-bold text-blue-600 capitalize font-heading'>
                    {org.name}
                  </h2>
                </div>
                <div className='flex items-start py-4'>
                  <div className='w-8 mr-5 text-blue-500'>
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
                        d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='mb-2 text-xl font-semibold font-heading'>
                      Official Website
                    </h3>
                    <p className='leading-loose text-blueGray-400'>
                      {org.website}
                    </p>
                  </div>
                </div>
                <div className='flex items-start py-4'>
                  <div className='w-8 mr-5 text-blue-500'>
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
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='mb-2 text-xl font-semibold font-heading'>
                      Phone Number
                    </h3>
                    <p className='leading-loose text-blueGray-400'>
                      {org.phone}
                    </p>
                  </div>
                </div>
                <div className='flex items-start py-4'>
                  <div className='w-8 mr-5 text-blue-500'>
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
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='mb-2 text-xl font-semibold font-heading'>
                      Our Email
                    </h3>
                    <p className='leading-loose text-blueGray-400'>
                      {org.email}
                    </p>
                  </div>
                </div>
                <div className='flex items-start py-4'>
                  <div className='w-8 mr-5 text-blue-500'>
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
                        d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='mb-2 text-xl font-semibold font-heading'>
                      Official Address
                    </h3>
                    <p className='leading-loose text-blueGray-400'>
                      {org.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative w-full my-12 lg:w-1/2 lg:my-0'>
              <img
                className='relative z-10 w-full mx-auto rounded-xl'
                src={org.logo}
                alt=''
              />
              {/* <img
                className='absolute top-0 left-0 w-40 -mt-12 -ml-12'
                src='https://images.unsplash.com/photo-1536940135352-b4b3875df888?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;h=1050&amp;q=80'
                alt=''
              />
              <img
                className='absolute bottom-0 right-0 w-40 -mb-12 -mr-12'
                src='https://images.unsplash.com/photo-1536940135352-b4b3875df888?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;h=1050&amp;q=80'
                alt=''
              /> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params: ', params);
  const org = await prisma.organization.findUnique({
    where: { name: replaceDashToSpace(params.name) },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      },
    },
  });

  return {
    props: { org },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const orgs = await prisma.organization.findMany();

  return {
    paths: orgs.map((org) => ({
      params: {
        name: replaceSpaceToDash(org.name),
      },
    })),
    fallback: false,
  };
};

export default Organization;
