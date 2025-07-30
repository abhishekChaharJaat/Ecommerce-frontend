import { toast } from 'react-toastify';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  error: (message) => {
    toast.error(message || "Something went wrong!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  warning: (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  loading: (message) => {
    return toast.loading(message || "Loading...", {
      position: "top-right",
    });
  },
  
  update: (toastId, options) => {
    toast.update(toastId, options);
  },
  
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  }
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || 
                      error.message || 
                      "An unexpected error occurred";
  showToast.error(errorMessage);
  return errorMessage;
};