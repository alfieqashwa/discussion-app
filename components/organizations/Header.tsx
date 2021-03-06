export const Header = () => (
  <header className='flex items-center justify-between'>
    <h2 className='text-2xl font-semibold leading-6 text-blue-600 lg:text-4xl'>
      Organizations
    </h2>
    <button className='flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md lg:px-5 lg:text-xl hover:bg-blue-200 hover:text-blue-800 group'>
      <svg
        className='mr-2 text-blue-500 group-hover:text-blue-600'
        width='12'
        height='20'
        fill='currentColor'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z'
        />
      </svg>
      New
    </button>
  </header>
);
