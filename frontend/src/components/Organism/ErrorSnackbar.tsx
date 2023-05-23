import React, { useRef } from 'react';
import { useError } from '../../hook/ErrorContext';
import { useOutsideAlerter } from '../../hook/useOutsideAlerter';
import { TbAlertCircle } from 'react-icons/tb';

const ErrorSnackbar: React.FC = () => {
  const { error, clearError } = useError();
  const errorRef = useRef(null);
  useOutsideAlerter(errorRef, clearError);

  if (!error) {
    return null;
  }

  return (
    <div
      ref={errorRef}
      className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-sm shadow-lg max-w-md m-4 animate-bounce"
      style={{ zIndex: 500 }}
    >
      <div className="flex items-center">
        <TbAlertCircle className="w-5 h-5 text-white mr-2"/>
        <h2 className="text-lg font-bold">{error.title}</h2>
      </div>
      <div>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorSnackbar;