// source: https://github.com/leerob/next-prisma/blob/master/pages/songs/%5Bid%5D.js

import { GetStaticPaths, GetStaticProps } from 'next';

import prisma from 'lib/prisma';
import Layout from 'components/Layout';
import { Feature } from 'components/organizations/Feature';

import { replaceSpaceToDash, replaceDashToSpace } from 'lib/replaceString';
import { Hero } from 'components/organizations/Hero';

const Organization = ({ org }) => {
  return (
    <Layout>
      <section className='container px-4 mx-auto'>
        <header>
          <h2 className='text-4xl font-bold text-center text-gray-800 capitalize md:text-5xl lg:text-4xl'>
            {org.name}
          </h2>
        </header>

        <div className='lg:items-start lg:justify-center lg:flex-row-reverse lg:flex lg:mt-12'>
          <div className='w-full mt-10 shadow-xl lg:w-1/2'>
            <Hero src={org.logo} alt={org.name} />
          </div>
          <div className='flex flex-wrap mt-6 lg:mt-0 lg:flex-nowrap'>
            <div className='w-full lg:w-1/2'>
              <div className='py-6 space-y-5 md:space-y-7 lg:space-y-5'>
                <Feature
                  title='Official Website'
                  svg='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                  content={org.website}
                />
                <Feature
                  title='Phone'
                  content={org.phone}
                  svg='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
                <Feature
                  title='Our Email'
                  content={org.email}
                  svg='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                />
                <Feature
                  title='Address'
                  content={`${org.address.street}, ${org.address.city}, ${org.address?.country}, Postal Code ${org.address.zip}`}
                  svg='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log('params: ', params);
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
      address: {
        select: {
          country: true,
          street: true,
          city: true,
          state: true,
          zip: true,
        },
      },
    },
  });

  return {
    props: { org },
    revalidate: 1,
  };
};

export default Organization;
