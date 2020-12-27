import Image from 'next/image';

export const Hero = ({ src, alt }) => {
  const defaultSrc =
    'https://images.unsplash.com/photo-1523841589119-b55aee0f66e7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
  if (!src) {
    return (
      <Image
        className='w-full rounded-xl'
        src={defaultSrc}
        alt='default-hero'
        width={400}
        height={240}
        layout='responsive'
      />
    );
  }
  return (
    <Image
      className='w-full rounded-xl'
      src={src}
      alt={alt}
      width={400}
      height={240}
      layout='responsive'
    />
  );
};
