import { GetStaticProps, NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {logo} = req.body;

  const session = await getSession({ req })
  const result = await prisma.user.update({
    where: {email: session?.user?.email},
    data: {
      organization: {
        update: {logo}
      }
    }
  })
  
  res.json(result)
};
