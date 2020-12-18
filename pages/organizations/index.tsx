import { FC } from 'react';
import { GetStaticProps } from 'next';

import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { OrgProps } from 'types';

import { Header } from 'components/organizations/Header';
import { Search } from 'components/organizations/Search';
import { Card } from 'components/organizations/Card';

type Props = {
  organizations: OrgProps[];
};

const Organizations: FC<Props> = ({ organizations }) => {
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <Layout title='Organizations'>
      <section className='px-4 pt-2 pb-4 space-y-4 sm:px-6 lg:px-4 xl:px-6 sm:pb-6 lg:pb-4 xl:pb-6'>
        <Header />
        <Search />
        <ul className='grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
          {organizations.map((org) => (
            <Card key={org.id} org={org} />
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
