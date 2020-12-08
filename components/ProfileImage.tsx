import Image from 'next/image';

export const ProfileImage = ({ width, height, src, alt, layout }) => (
  <Image
    width={width}
    height={height}
    layout={layout}
    src={src}
    alt={alt}
    className='w-10 h-10 m-4 rounded-full ring-1 ring-blue-700'
  />
);
