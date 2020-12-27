import { useState, useEffect, useRef } from 'react';

export function UploadImage() {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>();

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

  //   img,
  // button {
  //   width: 200px;
  //   height: 200px;
  //   border-radius: 50%;
  //   cursor: pointer;
  // }

  // button {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   font-size: 18px;
  //   border: none;
  //   background: #fef289;
  //   color: #000;
  // }

  //   .container {
  //   min-height: 100vh;
  //   padding: 0 0.5rem;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // }

  return (
    <form action=''>
      {preview ? (
        <img
          className='flex items-center justify-center border-opacity-50 rounded-full cursor-pointer h-28 w-28'
          src={preview}
          style={{ objectFit: 'cover' }}
          onClick={() => {
            setImage(null);
          }}
        />
      ) : (
        <button
          className='bg-yellow-500 border-opacity-50 border-none rounded-full cursor-pointer ring ring-offset-2 ring-offset-gray-800 ring-fuchsia-600 text-gray-50 w-28 h-28'
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click();
          }}>
          Add Image
        </button>
      )}
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
    </form>
  );
}
