export const Search = () => (
  <form className='relative'>
    <svg
      width='20'
      height='20'
      fill='currentColor'
      className='absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
      />
    </svg>
    <input
      className='w-full py-2 pl-10 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
      type='text'
      aria-label='Filter organizations'
      placeholder='Filter organizations'
    />
  </form>
);
