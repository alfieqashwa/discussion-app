import Head from 'next/head';

function Header({ title }) {
  return (
    <Head>
      <title>Circle-Q | {title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
  );
}

export default Header;
