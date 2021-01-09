import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Layout from 'components/Layout';

export default function DocumentUpload() {
  const [uploadFormalLetter, SetUploadFormalLetter] = useState<File>();
  const [uploadConstitution, SetUploadConstitution] = useState<File>();
  const [uploadbyLaws, SetUploadByLaws] = useState<File>();
  const [
    uploadRegistrationPaper,
    SetUploadRegistrationPaper,
  ] = useState<File>();
  const [uploadMembership, SetUploadMembership] = useState<File>();
  const [loadingFile, setLoadingFile] = useState<Boolean>(false);

  const [session, loading] = useSession();
  const router = useRouter();

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/');
    }
  }, [session, loading]);

  const submitFormalLetter = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', uploadFormalLetter);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      setLoadingFile(true);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const formalAppLetter = await data.secure_url;
      const body = { formalAppLetter };

      await fetch('http://localhost:3000/api/organization/uploadDocs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(body);
      await router.push('/organizations');
    } catch (err) {
      console.error(err);
    }
    setLoadingFile(false);
  };

  return (
    <Layout title='File Upload'>
      <div className='mt-5 md:mt-0 md:col-span-2'>
        <form onSubmit={submitFormalLetter}>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-4 py-5 space-y-6 bg-white sm:p-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Formal Application Letter
                </label>
                <div className='flex items-center mt-2'></div>
                <input
                  type='file'
                  name='formalLetter'
                  accept='.docx, .pdf'
                  onChange={(e) => SetUploadFormalLetter(e.target.files[0])}
                />
              </div>
            </div>

            <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
              {!uploadFormalLetter || loadingFile ? (
                <button
                  type='submit'
                  disabled
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-gray-600 border border-transparent rounded-md shadow-sm text-gray-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                  Submit
                </button>
              ) : (
                <button
                  type='submit'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-800 border border-transparent rounded-md shadow-sm text-gray-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  Submit
                </button>
              )}
            </div>
            <h2 className='mt-20 text-3xl font-bold text-center text-red-700'>
              STILL NOT WORKING YET, CANNOT DOWNLOAD THE PDF FILES !!
            </h2>
          </div>
        </form>
      </div>
    </Layout>
  );
}
