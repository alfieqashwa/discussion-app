import Layout from 'components/Layout';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';

type IDoc = {
  id: number;
  title: string;
};

const documents = [
  { id: 1, title: 'Formal Application Letter' },
  { id: 2, title: 'Constitution' },
  { id: 3, title: 'By Laws' },
  { id: 4, title: 'Registration Papers Only' },
  { id: 5, title: 'Membership' },
];

export default function DocumentUpload() {
  const [uploadFiles, setUploadFiles] = useState([]);
  return (
    <Layout title='File Upload'>
      <div className='mt-5 md:mt-0 md:col-span-2'>
        <form>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            {documents.map((doc: IDoc) => (
              <div key={doc.id} className='px-4 py-5 space-y-6 bg-white sm:p-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    {doc.title}
                  </label>
                  <div className='flex items-center mt-2'></div>
                  <input type='file' accept='.docx, .pdf' />
                </div>
              </div>
            ))}
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
