// import { useState } from 'react';

// // eslint-disable-next-line react/prop-types
// const FormSubmitHandler = ({ formData = {}, resetForm }) => {
//   const [status, setStatus] = useState('idle'); // idle, loading, success, error
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     if (!formData || Object.keys(formData).length === 0) {
//       setError('No data to submit.');
//       setStatus('error');
//       return;
//     }

//     // Check if regNo exists in the formData
//     if (!formData.regNo) {
//       setError('Registration number (regNo) is required.');
//       setStatus('error');
//       return;
//     }

//     try {
//       setStatus('loading');
//       setError('');

//       let body;
//       try {
//         body = JSON.stringify(formData);
//       } catch (err) {
//         setError('Invalid data format.');
//         setStatus('error');
//         return;
//       }

//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

//       // Update the endpoint to match your backend API route
//       const response = await fetch('http://localhost:5000/api/baby', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body,
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to submit data');
//       }

//       const responseData = await response.json();
//       console.log('Submission successful:', responseData);

//       setStatus('success');
//       setTimeout(() => {
//         setStatus('idle');
//         resetForm(); // Reset form after successful submission
//       }, 3000);
//     } catch (err) {
//       setError(err.name === 'AbortError' ? 'Request timed out. Please try again.' : err.message);
//       setStatus('error');
//       console.error('Submission error:', err);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 space-y-4">
//       {/* Error Message */}
//       {status === 'error' && (
//         <div aria-live="assertive" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative w-96">
//           {error || 'Failed to submit data. Please try again.'}
//         </div>
//       )}
      
//       {/* Success Message */}
//       {status === 'success' && (
//         <div aria-live="assertive" className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative w-96">
//           Data submitted successfully!
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         aria-label="Submit all records"
//         onClick={handleSubmit}
//         disabled={status === 'loading'}
//         className={`px-6 py-3 rounded-lg text-white font-medium shadow-lg transition-all
//           ${status === 'loading' 
//             ? 'bg-blue-400 cursor-not-allowed' 
//             : 'bg-blue-600 hover:bg-blue-700'
//           }
//         `}
//       >
//         {status === 'loading' ? 'Submitting...' : 'Submit All Records'}
//       </button>
//     </div>
//   );
// };

// export default FormSubmitHandler;

import React from 'react';

export const useFormSubmission = (endpoint, options = {}) => {
  const {
    onSuccess = () => alert('Form submitted successfully!'),
    onError = (error) => alert(`Failed to submit form: ${error.message}`),
    resetForm = () => {},
    method = 'POST',
    headers = {
      'Content-Type': 'application/json',
    },
  } = options;

  const submitForm = async (formData) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      onSuccess(result);
      resetForm();
      return result;
    } catch (error) {
      console.error('Error submitting form:', error);
      onError(error);
      throw error;
    }
  };

  return {
    submitForm,
  };
};

export default useFormSubmission;