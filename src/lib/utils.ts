import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Unknown error';
  }
  toast.error(message);
};
