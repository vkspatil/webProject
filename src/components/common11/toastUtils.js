import { toast } from "react-hot-toast";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid"; // You can use any icon set

// Common Toast Style with Tailwind CSS classes
const toastStyle = {
  background: "#fff", // White background
  color: "#333", // Darker text for contrast
  padding: "4px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  border: "1px solid #e5e7eb", // Light gray border for better visibility
};

const Loader = () => (
  <svg
    aria-hidden="true"
    role="status"
    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="#1C64F2"
    />
  </svg>
);

// Error Toast
export const showErrorToast = (message) => {
  toast(
    (t) => (
      <div className="flex items-center space-x-3">
        <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    ),
    {
      style: { ...toastStyle },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
      duration: 4000, // Duration for the toast to be visible
      position: "top-center", // Position of the toast
    }
  );
};

// Success Toast
export const showSuccessToast = (message) => {
  toast(
    (t) => (
      <div className="flex items-center space-x-3">
        <CheckCircleIcon className="w-3 h-6 text-green-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    ),
    {
      style: { ...toastStyle },
      iconTheme: {
        primary: "#10b981",
        secondary: "#fff",
      },
      duration: 4000,
      position: "top-center",
    }
  );
};

// Warning Toast
export const showWarningToast = (message) => {
  toast(
    (t) => (
      <div className="flex items-center space-x-3">
        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    ),
    {
      style: { ...toastStyle },
      iconTheme: {
        primary: "#f59e0b",
        secondary: "#fff",
      },
      duration: 4000,
      position: "top-center",
    }
  );
};

// Reusable Toast Promise Function
export const showToastPromise = (promise, { loading, success, error }) => {
  return toast.promise(
    promise,
    {
      loading: (
        <div className="flex items-center space-x-3">
          {/* <Loader /> */}
          <span className="text-sm font-medium">{loading}</span>
        </div>
      ),
      success: (
        <div className="flex items-center space-x-3">
          {/* <CheckCircleIcon className="w-6 h-6 text-green-500" /> */}
          <span className="text-sm font-medium">{success}</span>
        </div>
      ),
      error: (
        <div className="flex items-center space-x-3">
          {/* <ExclamationCircleIcon className="w-6 h-6 text-red-500" /> */}
          <span className="text-sm font-medium">{error}</span>
        </div>
      ),
    },
    {
      style: { ...toastStyle },
      position: "top-center",
      // icon: !!loading && null,
    }
  );
};
