import React from 'react';
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';

import Layout from 'components/Layout';

const Dashboard = ({ users }) => {
  return (
    <Layout title='Dashboard' profileImg={users[0].image}>
      <h1 className='text-2xl'>Dashboard Page</h1>
      <br />
      <code>{JSON.stringify(users, null, 4)}</code>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: { id: true, email: true, image: true },
  });

  return {
    props: { users },
  };
};

export default Dashboard;
