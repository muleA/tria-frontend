// notify.tsx
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Notify = (type: 'success' | 'error' | 'warning' | 'info', message: string): void => {
  // Display toast using react-toastify
  toast[type](message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
