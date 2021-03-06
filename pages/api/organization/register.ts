// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// example from: https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {name, email, country, street, city, state, zip, website, phone} = req.body;

  const session = await getSession({ req })
  const result = await prisma.organization.create({
    data: {
      name,
      email,
      website, 
      phone,
      address: {create: {country, street, city, state, zip}},
      users: { connect: {email: session?.user?.email }},
    }
  })
  res.json(result)
};
