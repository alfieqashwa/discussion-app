import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Layout from 'components/Layout';

type Props = {
  id: number;
  name: string;
  email: string;
  image: string;
  role?: string;
};

const Dashboard: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [session, loading] = useSession();
  const router = useRouter();

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/');
    }
  }, [session, loading]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      setImageLoading(true);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const logo = await data.secure_url;

      const body = { name, email, website, address, phone, logo };

      await fetch(`http://localhost:3000/api/organization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/organizations');
    } catch (err) {
      console.error(err);
    }
    setImageLoading(false);
  };

  return (
    <Layout title='Dashboard'>
      <div className='mt-8 space-y-4 text-center'>
        <img
          className='inline-block rounded-full w-36 h-36 ring ring-pink-700 ring-offset-2'
          src={session?.user.image}
          alt={session?.user.name}
        />
        <h1 className='text-2xl font-medium text-gray-700 capitalize'>
          Welcome, {session?.user.name} !
        </h1>
        <p className='text-gray-600'>
          Please add your Organization info below...
        </p>
      </div>
      <form
        onSubmit={submitData}
        className='flex flex-col justify-start mx-4 mt-8 space-y-4 bg-blue-100'>
        <div className='space-x-2 text-gray-700 text-md'>
          <label>Organization:</label>
          <input
            autoFocus
            type='text'
            name='name'
            placeholder="Organization's name"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />
        </div>
        <div className='space-x-2 text-gray-700 text-md'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            placeholder='example@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='space-x-2 text-gray-700 text-md'>
          <label>Website:</label>
          <input
            type='text'
            name='website'
            placeholder="Website's URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className='space-x-2 text-gray-700 text-md'>
          <label>Phone:</label>
          <input
            type='text'
            name='phone'
            placeholder='+62-81-280-000-980'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='space-x-2 text-gray-700 text-md'>
          <label>Address:</label>
          <input
            type='text'
            name='website'
            placeholder='Orgs address'
            value={address}
            onChange={(e) => setAddress(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <label htmlFor='image'>Image:</label>
          <input
            type='file'
            id='file'
            name='file'
            placeholder='Upload Image'
            onChange={uploadFile}
          />
        </div>
        <button
          type='submit'
          disabled={!name || !email || !website || !phone || !address}
          className='py-2 text-xl bg-blue-800 rounded-lg text-gray-50 hover:bg-blue-700 disabled:bg-gray-800 disabled:opacity-50'>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Dashboard;
