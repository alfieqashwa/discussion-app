import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { urlRestCountries } from 'lib/fetcher';
import { OrgProps } from 'types';

import Layout from 'components/Layout';

const Dashboard: FC = () => {
  const { register, errors, handleSubmit } = useForm<OrgProps>();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
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
                    name='address'
                    id='address'
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

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Logo
                </label>
                <div className='flex items-center mt-2'>
                  <span className='inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full'>
                    <svg
                      className='w-full h-full text-gray-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'>
                      <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                  </span>
                  <button
                    type='button'
                    className='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                    Change
                  </button>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Upload files
                </label>
                <div className='flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md'>
                  <div className='space-y-1 text-center'>
                    <svg
                      className='w-12 h-12 mx-auto text-gray-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'>
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'>
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <div className='px-4 py-3 mt-4 text-right bg-gray-50 sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-800 border border-transparent rounded-md shadow-sm text-gray-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Dashboard;
