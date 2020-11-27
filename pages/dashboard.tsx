import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/client';

import Layout from 'components/Layout';

const Dashboard: FC<{ allUsers: [UserProps] }> = ({ allUsers }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/');
    }
  }, [session, loading]);

  const user = allUsers.filter((user) => user.email === session?.user.email);
  return (
    <Layout title='Dashboard' profileImg={user[0]?.image}>
      <h1 className='text-2xl'>Dashboard Page</h1>
      <br />
      <code>{JSON.stringify(user, null, 4)}</code>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true, image: true },
  });

  return {
    props: { allUsers },
  };
};

export type UserProps = {
  id?: number;
  email: string;
  image?: string | null;
  entityImage?: string | null;
};

export default Dashboard;
