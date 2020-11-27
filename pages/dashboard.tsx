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
      <div className='text-center'>
        <h1 className='text-2xl'>Dashboard Page</h1>
        <div className='mt-8 space-y-4'>
          <h1 className='text-2xl capitalize'>from prisma database</h1>
          <ul className='px-2 py-4 space-y-8 text-xl'>
            {allUsers.map((user) => (
              <li
                key={user.id}
                className='flex items-center justify-center space-x-2'>
                <img
                  className='h-16 border-4 border-pink-400 rounded-full '
                  src={user.image}
                  alt={user.name}
                />
                <div>
                  <h2>Email: {user.email}</h2>
                  <h2>Name: {user.name}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-8 space-y-4'>
          <h1 className='text-2xl capitalize'>from user session</h1>
          <div className='text-xl'>
            {JSON.stringify(session?.user.email, null, 4)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, image: true },
  });

  return {
    props: { allUsers },
  };
};

export type UserProps = {
  id?: number;
  email: string;
  name: string;
  image?: string | null;
  entityImage?: string | null;
};

export default Dashboard;
