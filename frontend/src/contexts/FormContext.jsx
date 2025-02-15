import React, { createContext, useContext, useState } from "react";

// Create the Context
const FormContext = createContext();

// Create the Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    bmi: "",
    height: "",
    allergies: "",
    name: "",
    ageOfMother: "",
    nameOfHospitalClinic: "",
    nameOfConsultantObstetrician: "",
    mohArea: "",
    phmArea: "",
    nameOfFieldClinic: "",
    gramaNiladhariDivision: "",
    registrationNumber: "",
    registrationDate: "",

    // Risk Conditions
    antenatalRiskConditions: "",

    // Obstetric History
    gravidity: "",
    parity: "",
    childrenCount: "",
    ageOfYoungestChild: "",
    lastMenstrualPeriod: "",
    expectedDueDate: "",
    dateOf40WeeksCompletion: "",
    ultrasonographyCorrectEDD: "",
    periodOfArrivalAtDatingScan: "",
    dateOfQuickening: "",
    periodOfArrivalAtRegistration: "",

    // Screening and Immunization
    consanguinity: "",
    rubellaStatus: "",
    prePregnancyScreening: false,
    preconceptionalFolicAcid: false,
    subfertilityHistory: false,
    plannedPregnancy: false,
    lastFamilyPlanningMethod: "",

    // Wife's Personal Information
    wifeAge: "",
    wifeHighestEducationLevel: "",
    wifeOccupation: "",

    // Husband's Personal Information
    husbandAge: "",
    husbandHighestEducationLevel: "",
    husbandOccupation: "",

    // Family History
    familyHistory: {
      diabetesMellitus: false,
      hypertension: false,
      haematologicalDiseases: false,
      twinOrMultiplePregnancies: false,
      otherConditions: "",
    },

    // Medical/Surgical History
    medicalConditions: {
      diabetes: false,
      hypertension: false,
      cardiacDiseases: false,
      renalDiseases: false,
      hepaticDiseases: false,
      psychiatricIllnesses: false,
      epilepsy: false,
      malignancies: false,
      haematologicalDiseases: false,
      tuberculosis: false,
      thyroidDiseases: false,
      bronchialAsthma: false,
    },

    // Additional Medical History
    additionalMedicalHistory: {
      previousDVT: false,
      surgeriesOtherThanLSCS: false,
      otherSpecificConditions: "",
    },

    // Social Z Score
    socialZScore: "",

    // Past Obstetric History
    pastPregnancies: [],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook for Using Context
export const useFormContext = () => {
  return useContext(FormContext);
};




