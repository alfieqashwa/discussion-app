import React, { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { urlRestCountries } from 'lib/fetcher';
import { OrgProps } from 'types';

import Layout from 'components/Layout';

const Dashboard: FC = () => {
  const router = useRouter();
  const { register, errors, handleSubmit, reset } = useForm<OrgProps>({
    mode: 'onChange',
  });

  const onSubmit = async (data, e) => {
    e.target.reset(); // reset after form submit

    const {
      name,
      email,
      country,
      street,
      city,
      state,
      zip,
      website,
      phone,
    } = data;

    try {
      const body = {
        name,
        email,
        country,
        street,
        city,
        state,
        zip,
        website,
        phone,
      };
      await fetch(`http://localhost:3000/api/organization/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/fileupload');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(errors);

  const { data, error } = useSWR(urlRestCountries);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout title='Dashboard'>
      <div className='mt-5 md:mt-0 md:col-span-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='overflow-hidden shadow sm:rounded-md'>
            <div className='px-4 py-5 bg-white sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='organization-name'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 40,
                    })}
                  />
                  {errors.name && (
                    <span className='text-sm text-red-400'>
                      This field is required
                    </span>
                  )}
                </div>

                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'>
                    Email address
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    autoComplete='email'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.email && (
                    <span className='text-sm text-red-400'>
                      Email is required
                    </span>
                  )}
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium text-gray-700'>
                    Country / Region
                  </label>
                  <select
                    id='country'
                    name='country'
                    autoComplete='country'
                    className='block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'>
                    ref={register({ required: true })}
                    {data.map((country) => (
                      <option value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <div className='col-span-6'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700'>
                    Street address
                  </label>
                  <input
                    type='text'
                    name='street'
                    id='street'
                    autoComplete='address'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ref={register}
                  />
                </div>

                <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-700'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ref={register}
                  />
                </div>

                <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                  <label
                    htmlFor='state'
                    className='block text-sm font-medium text-gray-700'>
                    State / Province
                  </label>
                  <input
                    type='text'
                    name='state'
                    id='state'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ref={register}
                  />
                </div>

                <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                  <label
                    htmlFor='zip'
                    className='block text-sm font-medium text-gray-700'>
                    ZIP / Postal
                  </label>
                  <input
                    type='text'
                    name='zip'
                    id='zip'
                    autoComplete='zip'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    ref={register}
                  />
                </div>
              </div>
            </div>

            <div className='px-4 py-5 space-y-6 bg-white sm:p-6'>
              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='website'
                    className='block text-sm font-medium text-gray-700'>
                    Website
                  </label>
                  <div className='flex mt-1 rounded-md shadow-sm'>
                    <span className='inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50'>
                      http://
                    </span>
                    <input
                      type='text'
                      name='website'
                      id='website'
                      className='flex-1 block w-full border-gray-300 rounded-none focus:ring-blue-500 focus:border-blue-500 rounded-r-md sm:text-sm'
                      placeholder='www.example.com'
                      ref={register}
                    />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700'>
                    Phone
                  </label>
                  <div className='flex mt-1 rounded-md shadow-sm'>
                    <span className='inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50'>
                      +62
                    </span>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      className='flex-1 block w-full border-gray-300 rounded-none focus:ring-blue-500 focus:border-blue-500 rounded-r-md sm:text-sm'
                      placeholder='+62-811-555-777-99'
                      ref={register}
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end px-4 py-3 mt-4 space-x-4 bg-gray-50 sm:px-6'>
                <button
                  type='reset'
                  onClick={() => reset()}
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-gray-800 border border-transparent rounded-md shadow-sm text-gray-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                  Reset
                </button>
                <button
                  type='submit'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-800 border border-transparent rounded-md shadow-sm text-gray-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Dashboard;
