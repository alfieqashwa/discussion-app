export const Feature = ({ title, content, svg }) => (
  <div className='flex items-start space-x-5 md:space-x-8 lg:space-x-5'>
    <div className='w-8 text-blue-500'>
      <svg
        className='w-8 h-8 md:w-10 md:h-10 lg:w-8 lg:h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d={svg}
        />
      </svg>
    </div>
    <div>
      <h3 className='text-xl font-semibold md:text-2xl lg:text-lg font-heading'>
        {title}
      </h3>
      <p className='text-lg leading-loose md:text-xl lg:text-lg text-blueGray-400'>
        {content}
      </p>
    </div>
  </div>
);
