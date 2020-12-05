import useSWR from 'swr';
import { useSession } from 'next-auth/client';

import Header from './Header';
import Nav from './Nav';

export default function Layout({
  title = 'Home',
  children,
}: {
  title?: string;
  children: any;
}) {
  const [session, loading] = useSession();

  const { data: users, error } = useSWR('api/user', { refreshInterval: 0 }); // override

  if (error) return <div>failed to load</div>;
  if (!users) return <div>Loading...</div>;

  const user = users.filter((user) => user.email === session?.user.email);

  return (
    <div className=''>
      <Nav user={user} />
      <Header title={title} />
      <main>
        <div className='py-6 sm:px-6 lg:px-8'>
          {/* <!-- Replace with your content --> */}
          <div className='px-4 py-6 sm:px-0'>
            <div className='border-4 border-gray-200 border-dashed rounded-lg h-96'>
              {children}
            </div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  );
}
