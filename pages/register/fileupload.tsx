import { useState, useEffect, useRef } from 'react';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

export default function FileUpload() {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>();

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

  const submitFile = async (e: React.SyntheticEvent) => {
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

      const body = { logo };

      await fetch('http://localhost:3000/api/organization/uploadFile', {
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
    <Layout title='File Upload'>
      <div className='mt-5 md:mt-0 md:col-span-2'>
        <form onSubmit={submitFile}>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-4 py-5 space-y-6 bg-white sm:p-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Organization Logo
                </label>
                <div className='flex items-center mt-2'>
                  {preview ? (
                    <img
                      className='flex items-center justify-center w-20 h-20 border-opacity-50 rounded-full cursor-pointer'
                      src={preview}
                      style={{ objectFit: 'cover' }}
                      // onClick={() => {
                      //   setImage(null);
                      // }}
                    />
                  ) : (
                    <span className='inline-block w-20 h-20 overflow-hidden bg-gray-100 rounded-full'>
                      <svg
                        className='w-full h-full text-gray-300'
                        fill='currentColor'
                        viewBox='0 0 24 24'>
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                    </span>
                  )}
                  <button
                    type='button'
                    onClick={(event) => {
                      event.preventDefault();
                      fileInputRef.current.click();
                    }}
                    className='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                    Change
                  </button>
                </div>
                <input
                  type='file'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  accept='image/*'
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substr(0, 5) === 'image') {
                      setImage(file);
                    } else {
                      setImage(null);
                    }
                  }}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Documents
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
              </div>
            </div>
            <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
              <button
                type='submit'
                className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-800 border border-transparent rounded-md shadow-sm text-gray-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
