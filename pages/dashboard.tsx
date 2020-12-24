import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { fetcher } from 'lib/fetcher';
import { OrgProps } from 'types';
import Layout from 'components/Layout';

const Dashboard: FC = () => {
  const { register, errors, handleSubmit } = useForm<OrgProps>();

  // TODO: https://api.printful.com/countries
  // auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiZXhwIjoxNjA4OTAwMTcwfQ.TOMpxoJmb6ZsNkD7hETUKFaV-hg5IOYJZiyhrhgQjUY"

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  console.log(errors);

  const { data, error } = useSWR(
    'https://api.first.org/data/v1/countries',
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <Layout title='Dashboard'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='name'>Organization Name</label>
            <select name='name' placeholder='Org Name'>
              ref=
              {register({
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              <option value='Select...'>Select</option>
              <option value='org 1'>Org 1</option>
              <option value='org 2'>Org 2</option>
            </select>
            {errors.name && 'Name is required'}
          </div>
          <div>
            <label>Image</label>
            <input
              name='logo'
              type='text'
              placeholder='TODO Logo'
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name='email'
              type='email'
              placeholder='Email'
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && <span>Email is required</span>}
          </div>
          <div>
            <label>Phone</label>
            <input
              name='phone'
              type='tel'
              placeholder='Phone'
              ref={register({ required: true, maxLength: 11, minLength: 8 })}
            />
            {errors.phone && <span>Min length is 7 numbers</span>}
          </div>
          <div>
            <label htmlFor='website'>Website</label>
            <input
              name='website'
              type='text'
              placeholder='Website'
              ref={register}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              name='address'
              type='text'
              placeholder='Address'
              ref={register}
            />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input name='city' type='text' placeholder='City' ref={register} />
          </div>
          <div>
            <label htmlFor='state'>State</label>
            {/* <select name='state' placeholder='State' ref={register}>
              <option value={countries.name}>{countries.name}</option>
            </select> */}
          </div>
          <div>
            <label htmlFor='zip'>Zip</label>
            <input name='zip' type='text' placeholder='Zip' ref={register} />
          </div>

          <div>
            <label>Aggree of the Terms?</label>
            <input
              type='radio'
              value='Yes'
              ref={register({ required: true })}
            />
            <input type='radio' value='No' ref={register({ required: true })} />
          </div>
          <input type='submit' />
        </form>
      </div>
    </Layout>
  );
};

export default Dashboard;
