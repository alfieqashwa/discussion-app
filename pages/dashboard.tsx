import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';

import Layout from 'components/Layout';

const Dashboard: FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { data: users, error } = useSWR('api/user', { refreshInterval: 0 }); // override

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/');
    }
  }, [session, loading]);

  if (error) return <div>failed to load</div>;
  if (!users) return <div>Loading...</div>;

  const user = users.filter((user) => user.email === session?.user.email);
  return (
    <Layout title='Dashboard'>
      <div className='text-center'>
        <h1 className='text-2xl'>Dashboard Page</h1>
        <div className='mt-8 space-y-4'>
          <h1 className='text-2xl capitalize'>from prisma database</h1>
          <ul className='px-2 py-4 space-y-8 text-xl'>
            {user.map((user) => (
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

export default Dashboard;
