import Image from 'next/image';

export const Hero = ({ src, alt }) => (
  <Image
    className='w-full rounded-xl'
    src={src}
    alt={alt}
    width={400}
    height={240}
    layout='responsive'
  />
);
