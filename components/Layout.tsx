import { profile } from 'console';
import Header from './Header';
import Nav from './Nav';

export default function Layout({
  title = 'Home',
  children,
  profileImg = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}: {
  title?: string;
  children: any;
  profileImg?: string;
}) {
  return (
    <div className=''>
      <Nav profileImg={profileImg} />
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
