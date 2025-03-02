// import { useState } from "react";

// export default function SensoryScreening() {
//   const [answers, setAnswers] = useState({});

//   const questions = {
//     vision: {
//       "Birth to one week": [
//         "Does the baby direct its eyes towards the light?",
//         "Does the baby look at your face well?"
//       ],
//       "At 2 months": [
//         "Does the baby smile responsively at you as you turn your face?",
//         "Do both the baby's eyes move together?"
//       ],
//       "At 6 months": [
//         "Does the child look around curiously?",
//         "Does the child try to reach out and grab something?",
//         "Do you suspect the baby is crossed-eyed?"
//       ],
//       "At 10 months": [
//         "Is the child able to pick small items with the help of their thumb and forefinger?"
//       ],
//       "At 12 months": [
//         "Does your child reach for things and ask for them?",
//         "Does the child recognize familiar people and try to talk to them?"
//       ]
//     },
//     hearing: {
//       "Shortly after birth": [
//         "Does your child get startled and blink at a sudden loud noise (Like clapping or a door slamming shut) or widen their eyes?",
//       ],
//       "At 1 month": [
//         "Does your child try to identify or listen silently to sudden or continuous sounds (sound of a car)?"
//       ],
//       "At 4 months": [
//         "Does the child smile upon hearing their mother/guardian's voice when out of sight?",
//         "Does the child turn their head or eyes when the mother/guardian speaks from a side"
//       ],
//       "At 7 months": [
//         "Does the baby immediately turn when the mother/guardian speak?"
//       ],
//       "At 9 months": [
//         "Does your child listen to daily familiar sounds?",
//         "Listen to sounds coming from unseen places?",
//         "Like when spoken rhythmically?",
//       ],
//       "At 12 months": [
//         "React for their name or familiar sounds?",
//         "Show correct response for words like no, tata?"
//       ]
//     }
//   };

//   const handleToggle = (question) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [question]: !prevAnswers[question]
//     }));
//   };

//   const renderSection = (title, questions) => (
//     <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-blue-600">{title}</h2>
//       </div>
//       <div className="space-y-6">
//         {Object.entries(questions).map(([ageRange, questionList]) => (
//           <div key={ageRange} className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">{ageRange}</h3>
//             <div className="space-y-4">
//               {questionList.map((question, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <p className="flex-grow text-gray-600">{question}</p>
//                   <button
//                     onClick={() => handleToggle(question)}
//                     className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                       answers[question]
//                         ? "bg-green-500 text-white hover:bg-green-600"
//                         : "bg-red-500 text-white hover:bg-red-600"
//                     }`}
//                   >
//                     {answers[question] ? "Yes" : "No"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       {renderSection("Vision Screening", questions.vision)}
//       {renderSection("Hearing Evaluation", questions.hearing)}
//     </div>
//   );
// }

import { useState } from "react";

export default function SensoryScreening() {
  const [answers, setAnswers] = useState({});

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

  const handleToggle = (question) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: !prevAnswers[question]
    }));
  };

  const renderSection = (title, questions) => (
    <div className="bg-white border-l-4 border-blue-500 p-6 rounded-lg mb-8 shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {title}
        </h2>
      </div>
      <div className="space-y-6">
        {Object.entries(questions).map(([ageRange, questionList]) => (
          <div key={ageRange} className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">{ageRange}</h3>
            <div className="space-y-4">
              {questionList.map((question, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <p className="flex-grow text-gray-700">{question}</p>
                  <button
                    onClick={() => handleToggle(question)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      answers[question]
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {answers[question] ? "Yes" : "No"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">Sensory Screening</h1>
      {renderSection("Vision Screening", questions.vision)}
      {renderSection("Hearing Evaluation", questions.hearing)}
    </div>
  );
}