export default function Layout({ children }) {
  return (
    <div className='antialiased bg-gray-50 min-h-screen container max-w-full'>
      <nav className='p-4 text-gray-800 font-bold text-lg'>
        <ul className='flex justify-between'>
          <li className=''>LOGO</li>
          <li className=''>IMAGE</li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
