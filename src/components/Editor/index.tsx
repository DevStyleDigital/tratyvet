import React from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';

const DynamicQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export const Editor = ({
  defaultValue,
  placeholder,
  onChange,
  required,
}: {
  required?: boolean;
  defaultValue?: ReactQuill.Value;
  onChange?: ReactQuill.ReactQuillProps['onChange'];
  placeholder: string;
}) => {
  return (
    <DynamicQuill
      defaultValue={defaultValue}
      placeholder={placeholder}
      modules={{
        toolbar: [['bold', 'italic'], ['clean']],
        clipboard: {
          matchVisual: false,
        },
      }}
      theme="snow"
      onChange={onChange}
    />
  );
};
