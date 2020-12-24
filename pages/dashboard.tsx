import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';

import { OrgProps } from 'types';
import Layout from 'components/Layout';

const Dashboard: FC = () => {
  const { register, errors, handleSubmit } = useForm<OrgProps>();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  console.log(errors);

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
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
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
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
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
                    className='block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
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
                    name='address'
                    id='address'
                    autoComplete='address'
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                    className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    ref={register}
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
              <button
                type='submit'
                className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Dashboard;
