import Header from './Header';
import Nav from './Nav';

export default function Layout({
  title = 'Home',
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <div className=''>
      <Nav />
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
