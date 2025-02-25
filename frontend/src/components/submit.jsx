// import { useState } from 'react';

// // eslint-disable-next-line react/prop-types
// const FormSubmitHandler = ({ formData = {} }) => {
//   const [status, setStatus] = useState('idle'); // idle, loading, success, error
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     try {
//       setStatus('loading');
//       setError('');

//       // Example API call - replace URL with your backend endpoint
// const response = await fetch('/api/baby-records', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit data');
//       }

//       setStatus('success');
//       setTimeout(() => setStatus('idle'), 3000);
//     } catch (err) {
//       setError(err.message);
//       setStatus('error');
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 space-y-4">
//       {/* Error Message */}
//       {status === 'error' && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative w-96">
//           {error || 'Failed to submit data. Please try again.'}
//         </div>
//       )}
      
//       {/* Success Message */}
//       {status === 'success' && (
//         <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative w-96">
//           Data submitted successfully!
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
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

import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const FormSubmitHandler = ({ formData = {} }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      setStatus('loading');
      setError('');

      // Mock API delay
      setTimeout(() => {
        // Log the formatted data to console
        console.log('Form Data Submitted:', {
          timestamp: new Date().toISOString(),
          formType: formData.type,
          data: formData.data
        });

        console.table(formData.data);

        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      }, 1000); // Simulate network delay

    } catch (err) {
      console.error('Submit Error:', err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-4">
      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative w-96">
          {error || 'Failed to submit data. Please check console for details.'}
        </div>
      )}
      
      {/* Success Message */}
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative w-96">
          Data logged to console successfully! Check browser developer tools.
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        className={`px-6 py-3 rounded-lg text-white font-medium shadow-lg transition-all
          ${status === 'loading' 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
          }
        `}
      >
        {status === 'loading' ? 'Logging to Console...' : 'Test Submit (Check Console)'}
      </button>

      {/* Debug Button */}
      <button
        onClick={() => console.log('Current Form Data:', formData)}
        className="ml-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
      >
        View Current Data
      </button>
    </div>
  );
};

export default FormSubmitHandler;