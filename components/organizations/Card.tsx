import Image from 'next/image';
import Link from 'next/link';

import { Hero } from './Hero';

import { replaceSpaceToDash } from 'lib/replaceString';

export const Card = ({ org }) => (
  <li>
    <Link href={`/organizations/${replaceSpaceToDash(org.name)}`}>
      <a className='block p-4 transition duration-150 ease-in-out border border-gray-200 rounded-lg hover:bg-cyan-300 hover:border-transparent hover:shadow-lg group'>
        {/* <Hero src={org.logo} alt={org.name} /> */}
        <dl className='grid items-center grid-cols-2 grid-rows-2 mt-2 lg:mt-4 sm:block lg:grid xl:block'>
          <div>
            <dt className='sr-only'>Name</dt>
            <dd className='font-medium leading-6 text-gray-800 capitalize lg:text-2xl lg:font-semibold group-hover:text-white'>
              {org.name}
            </dd>
          </div>
          <div>
            <dt className='sr-only'>Phone</dt>
            <dd className='text-sm text-gray-800 font-xl lg:text-lg sm:mb-4 lg:mb-4 xl:mb-4'>
              {org.phone}
            </dd>
          </div>
          <div>
            <dt className='sr-only'>Website</dt>
            <dd className='text-sm font-medium text-gray-800 lg:text-xl sm:mb-4 lg:mb-0 xl:mb-4'>
              {org.website}
            </dd>
          </div>
          <div className='col-start-2 row-start-1 row-end-3 '>
            <dt className='sr-only'>Users</dt>
            <dd className='flex justify-end -space-x-2 sm:justify-start lg:justify-end xl:justify-start'>
              {org.users.map((user) => (
                <Image
                  key={user.id}
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                  layout='fixed'
                  className='bg-gray-100 border-2 border-white rounded-full'
                />
              ))}
            </dd>
          </div>
        </dl>
      </a>
    </Link>
  </li>
);
