// source: https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/p/%5Bid%5D.tsx

import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import prisma from 'lib/prisma';
import organization from 'pages/api/organization';

const Organization = ({ org }) => {
  console.log('organization:', org);
  return (
    <div>
      <h1>Organization</h1>
      <pre>{JSON.stringify(org, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const org = await prisma.organization.findUnique({
    where: { id: Number(params?.id) },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      },
    },
  });

  return {
    props: { org },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const orgs = await prisma.organization.findMany();

  return {
    paths: orgs.map((org) => ({
      params: {
        id: org.id.toString(),
      },
    })),
    fallback: false,
  };
};

export default Organization;
