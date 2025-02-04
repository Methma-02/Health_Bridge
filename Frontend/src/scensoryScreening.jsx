import { useState } from "react";
export default function SensoryScreening() {
  const [answers, setAnswers] = useState({});

  const questions = {
    vison : {
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
  hearing:{
    "Shortly after birth":[
      "Does your child get starled and blink at a sudden loud noise(Like clapping or a door slamming shut) or widen their eyes?",
    ],
    "At 1 month" :[
      "Does your child try to identify or listen silently to sudden or continous sounds(sound of a car)?"
    ],
    "At 4 months" :[
      "Does the child smile upon hearing their mother/guardian's voice when out of sight?",
      "Does the child turn their head or eyes when the mother/guardain speaks from a side"
    ],
    "At 7 months" :[
      "Does the baby immediatly turn when the mother/guardian speak?"
    ],
    "At 9 months":[
      "Does your child listen to daily familar sounds?",
      "Listen to sounds comming from unseen places?",
      "like when spoken rhythamicaly?",
    ],
    "At 12 months":[
      "React for their name or familar sounds?",
      "Show corrrect response for words like no ,tata? "
    ]
  }
  
  };

  const handleToggle = (question) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: !prevAnswers[question] // Toggle between true/false
    }));
  };

  return (
    <>
    <div>
      <h2>Vision Screening</h2>
      {Object.keys(questions.vison).map((ageRange) => (
        <div key={ageRange}>
          <h3>{ageRange}</h3>
          {questions.vison[ageRange].map((vison, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p style={{ display: 'inline-block', marginRight: '10px' }}>{vison}</p>
              <button
                onClick={() => handleToggle(vison)}
                style={{ display: 'inline-block', marginRight: '5px' }}
              >
                {answers[vison] ? "Yes" : "No"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>

    <div>
      <h2>Hearing evaluation</h2>
      {Object.keys(questions.hearing).map((ageRange) => (
        <div key={ageRange}>
          <h3>{ageRange}</h3>
          {questions.hearing[ageRange].map((hearing, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p style={{ display: 'inline-block', marginRight: '10px' }}>{hearing}</p>
              <button
                onClick={() => handleToggle(hearing)}
                style={{ display: 'inline-block', marginRight: '5px' }}
              >
                {answers[hearing] ? "Yes" : "No"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}
