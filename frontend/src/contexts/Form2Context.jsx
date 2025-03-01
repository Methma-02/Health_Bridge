import React, { createContext, useContext, useEffect, useState } from "react";

// Create the Context
const Form2Context = createContext();

// Create the Provider Component
export const Form2Provider = ({ children }) => {
  const [formData, setFormData] = useState({
    regNo: '',
    regDate: '',
    regPlace: '',
    regFam: '',
    regArea: '',
    midwife: '',
    name: '',
    age: '',
    husbandName: '',
    husbandAge: '',
    address: '',
    contact: '',
    eduMother: '',
    eduFather: '',
    motherJob: '',
    distance: '',
    husbandJob: '',
    marriageAge: '',
    relative: '',
    vaccine: '',
    prenatal: '',
    folic: '',
    fertility: '',
    pregnancyNo: '',
    childNo: '',
    youngest: '',
    menstruation: '',
    hopedate: '',
    hopetime: '',
    fetal: '',
    noOfWeeks: '',
    famPlan: '',
    minOrMax: '',
    morePreg: '',
    bloodPressure: '',
    vaginalBleeding: '',
    fetusStatus: '',
    casualPosition: '',
    unknownDeliveryDate: '',
    other: '',
    bmi: '', 
    diabetes: '', 
    malaria: '', 
    heartProblems: '', 
    kidneyProblems: '', 
    otherProblems: '',
    familyDiabetes: '', 
    familyBloodPressure: '', 
    hematologicalConditions: '', 
    otherConditions: '',
  })

  
 useEffect(() => {
            console.log("in context")
           console.log(formData);
   }, [formData]);

  return (
    <Form2Context.Provider value={{ formData, setFormData }}>
      {children}
    </Form2Context.Provider>
  );
};

// Custom Hook for Using Context
export const useForm2Context = () => {
  return useContext(Form2Context);
};




