// Import necessary hooks from React
import { useState, useEffect } from "react";

// Define the main functional component for Sensory Screening
export default function SensoryScreening() {
  // State to store the registration number
  const [regNo, setRegNo] = useState("");
  // State to store the answers to the questions
  const [answers, setAnswers] = useState({});

  // Object containing the questions for vision and hearing screening, categorized by age ranges
  const questions = {
    vision: {
      "Birth to one week": [
        "Does the baby direct its eyes towards the light?",
        "Does the baby look at your face well?"
      ],
      "At 2 months": [
        "Does the baby smile responsively at you as you turn your face?",
        "Do both the baby's eyes move together?"
      ],
      "At 6 months": [
        "Does the child look around curiously?",
        "Does the child try to reach out and grab something?",
        "Do you suspect the baby is crossed-eyed?"
      ],
      "At 10 months": [
        "Is the child able to pick small items with the help of their thumb and forefinger?"
      ],
      "At 12 months": [
        "Does your child reach for things and ask for them?",
        "Does the child recognize familiar people and try to talk to them?"
      ]
    },
    hearing: {
      "Shortly after birth": [
        "Does your child get startled and blink at a sudden loud noise (Like clapping or a door slamming shut) or widen their eyes?",
      ],
      "At 1 month": [
        "Does your child try to identify or listen silently to sudden or continuous sounds (sound of a car)?"
      ],
      "At 4 months": [
        "Does the child smile upon hearing their mother/guardian's voice when out of sight?",
        "Does the child turn their head or eyes when the mother/guardian speaks from a side"
      ],
      "At 7 months": [
        "Does the baby immediately turn when the mother/guardian speak?"
      ],
      "At 9 months": [
        "Does your child listen to daily familiar sounds?",
        "Listen to sounds coming from unseen places?",
        "Like when spoken rhythmically?",
      ],
      "At 12 months": [
        "React for their name or familiar sounds?",
        "Show correct response for words like no, tata?"
      ]
    }
  };

  // useEffect hook to load saved registration number and fetch data when the component mounts
  useEffect(() => {
    // Retrieve the saved registration number from localStorage
    const savedRegNo = localStorage.getItem('sensoryScreeningRegNo');
    
    // If a saved registration number exists, set it in state and fetch data
    if (savedRegNo) {
      setRegNo(savedRegNo);
      fetchDataByRegistrationNumber(savedRegNo);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to toggle the answer for a specific question
  const handleToggle = (question) => {
    // Create a new answers object with the toggled value for the given question
    const newAnswers = {
      ...answers,
      [question]: !answers[question]
    };
    
    // Update the state with the new answers
    setAnswers(newAnswers);
    
    // Save the updated answers to localStorage
    localStorage.setItem('sensoryScreeningAnswers', JSON.stringify(newAnswers));
  };

  // Function to fetch data by registration number
  const fetchDataByRegistrationNumber = async (regNoParam) => {
    // Use the provided registration number or fallback to the state value
    const registrationNumber = regNoParam || regNo;
    
    // If no registration number is provided, show an alert and return
    if (!registrationNumber) {
      alert('Please enter a registration number.');
      return;
    }

    try {
      // Fetch data from the API using the registration number
      const response = await fetch(
        `http://localhost:3000/api/baby/${registrationNumber}`,
        {
          headers: {
            'x-user-role': 'mother', // Set the user role in the request headers
          }
        }
      );

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error('No data found for this registration number.');
      }

      // Parse the response data as JSON
      const data = await response.json();
      
      // Save the registration number to localStorage
      localStorage.setItem('sensoryScreeningRegNo', registrationNumber);
      
      // If there's sensory screening data in the response, process it
      if (data.sensoryScreening) {
        // Initialize an object to store fetched answers
        const fetchedAnswers = {};
        
        // Process vision questions from the fetched data
        Object.entries(data.sensoryScreening.vision || {}).forEach(([ageRange, questionList]) => {
          questionList.forEach(item => {
            if (item.question && item.answer !== undefined) {
              fetchedAnswers[item.question] = item.answer;
            }
          });
        });
        
        // Process hearing questions from the fetched data
        Object.entries(data.sensoryScreening.hearing || {}).forEach(([ageRange, questionList]) => {
          questionList.forEach(item => {
            if (item.question && item.answer !== undefined) {
              fetchedAnswers[item.question] = item.answer;
            }
          });
        });
        
        // Set the fetched answers in state
        setAnswers(fetchedAnswers);
        
        // Save the fetched answers to localStorage
        localStorage.setItem('sensoryScreeningAnswers', JSON.stringify(fetchedAnswers));
      }
      
      // Show a success alert if manually fetching data
      if (!regNoParam) {
        alert('Data loaded successfully!');
      }
    } catch (error) {
      // Log and handle any errors that occur during fetching
      console.error('Error fetching data:', error);
      if (!regNoParam) {
        alert('No data found for this registration number.');
      }
      
      // If there was an error, try to load answers from localStorage as a fallback
      const savedAnswers = localStorage.getItem('sensoryScreeningAnswers');
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // If no registration number is provided, show an alert and return
    if (!regNo) {
      alert('Please enter a registration number.');
      return;
    }
    
    // Format the data for API submission
    const sensoryScreeningData = {
      vision: {},
      hearing: {}
    };
    
    // Format vision data for submission
    Object.entries(questions.vision).forEach(([ageRange, questionList]) => {
      sensoryScreeningData.vision[ageRange] = questionList.map(question => ({
        question,
        answer: !!answers[question] // Convert the answer to a boolean
      }));
    });
    
    // Format hearing data for submission
    Object.entries(questions.hearing).forEach(([ageRange, questionList]) => {
      sensoryScreeningData.hearing[ageRange] = questionList.map(question => ({
        question,
        answer: !!answers[question] // Convert the answer to a boolean
      }));
    });
    
    try {
      // Submit the formatted data to the API
      const response = await fetch(`http://localhost:3000/api/baby/${regNo}/sensoryScreening`, {
        method: 'PUT', // Use PUT method for updating data
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          'x-user-role': 'mother', // Set the user role in the request headers
        },
        body: JSON.stringify({ sensoryScreening: sensoryScreeningData }), // Send the data as JSON
      });
      
      // If the response is not OK, throw an error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit sensory screening data');
      }
      
      // Save the registration number and answers to localStorage after successful submission
      localStorage.setItem('sensoryScreeningRegNo', regNo);
      localStorage.setItem('sensoryScreeningAnswers', JSON.stringify(answers));
      
      // Log the successful submission and show an alert
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Sensory screening data submitted successfully!');
    } catch (error) {
      // Log and handle any errors that occur during submission
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}`);
    }
  };

  // Function to render a section of questions
  const renderSection = (title, questions) => (
    <div className="bg-white border-l-4 border-blue-500 p-6 rounded-lg mb-8 shadow">
      <div className="space-y-6">
        {/* Map through each age range and its corresponding questions */}
        {Object.entries(questions).map(([ageRange, questionList]) => (
          <div key={ageRange} className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">{ageRange}</h3>
            <div className="space-y-4">
              {/* Map through each question in the age range */}
              {questionList.map((question, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <p className="flex-grow text-gray-700">{question}</p>
                  {/* Button to toggle the answer for the question */}
                  <button
                    type="button"
                    onClick={() => handleToggle(question)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      answers[question]
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {answers[question] ? "Yes" : "No"}
                  </button>
                </div>))}
            </div>
          </div>))}
      </div>
    </div>
  );

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Sensory Screening</h1>
        
        {/* Registration Number Section */}
        <div className="mb-6 bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
            </svg>
            Registration Information
          </h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-blue-700">Registration Number</label>
            <input
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="flex-grow p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
            <button
              type="button"
              onClick={() => fetchDataByRegistrationNumber()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Get Info
            </button>
          </div>
        </div>
        
        {/* Render the Vision Screening section */}
        {renderSection("Vision Screening", questions.vision)}
        {/* Render the Hearing Evaluation section */}
        {renderSection("Hearing Evaluation", questions.hearing)}
        
        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
          >
            Submit Sensory Screening
          </button>
        </div>
      </div>
    </form>
  );
}