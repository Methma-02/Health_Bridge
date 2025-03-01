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

    // New pregnancy history array for the table component
    pregnancyHistory: [
      { id: 1, result: '', details: '', placeOfBirth: '', bornWeight: '', complications: '', age: '' }
    ],

    prenatalFieldNote: null,

    // Add ClinicForm fields here
    dateOfVisit: '',
    weeksIntoPregnancy: '',
    weight: '',
    sugar: '',
    urine: '',
    albumin: '',
    security: '',
    swelling: '',
    bloodPressure: '',
    fetalHeight: '',
    location: '',
    fetalMovement: '',
    heartSounds: '',
    ironFolate: '',
    vitaminC: '',
    calciumTreatment: '',
    malletha: '',
    thripocha: '',
    testedBy: '',
    height: '',
    bmi: '',
    breastExamination: '',
    heartExamination: '',
    lungs: '',
    dentalDisaster: '',
    scrofula: '',
    wormTreatment: '',
    vrdlDates: '',
    vrdlResultDate: '',
    vrdlResult: '',
    referralDate: '',
    bloodClot: '',
    hemoglobin: '',
    bloodSugar: '',
    outpouringDate: '',
    batchNo: '',
    participatingClinics: '',
    mohClinic: false,
    specialClinic: false,
    privateClinic: false,
    otherClinic: false,
    reasonForOtherClinic: '',
    place: '',
    actionsTakenByMother: '',
    actionsTakenByFamilyHealthOfficer: '',
    birthPlace: '',
    birthDate: '',
    birthResult: '',
    institutionName: '',
    doneBy: '',
    dischargeDate: '',
    obstetricDetails: '',
    obstetricComplications: '',
    scratchesWound: false,
    remainingApura: false,
    prolongedLabour: false,
    postpartumBleeding: false,
    circumcisionDone: false,
    otherComplications: false,
    maternalDeathsDate: '',
    maternalDeathsReason: '',
    maternalDeathsInvestigated: false,
    postnatalCareMotherTemperature: '',
    postnatalCareMotherSecurity: '',
    contractions: '',
    users: '',
    coralBlood: '',
    paulSmellingDischarge: '',
    discontinued: false,
    mentalChanges: '',
    upperAbdominalPain: '',
    diarrhea: '',
    vomiting: '',
    difficultyBreathing: '',
    visualImpairment: '',
    painInTheGrain: '',
    childAbnormalities: '',
    fever: '',
    color: '',
    publicInfections: '',
    theWhite: '',
    breastfeedingObserved: '',
    mariloresMedicines: '',
    childsMedicine: '',
    peasantClinicDayAttendance: '',
    newbornScr: '',
    neonatalDeathsBelowDays: '',
    neonatalDeathsDays28: '',
    inspected: '',
    causeOfDeath: '',
    postpartumClinicAttendance: '',
    acceptedFamilyOrganizationSystem: '',
    ifNotAcceptedReturn: ''
  });

  

  useEffect(() => {
    console.log("in context");
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

export default Form2Context;