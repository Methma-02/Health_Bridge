import React, { createContext, useContext, useEffect, useState } from "react";

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

    visits: Array(10).fill().map(() => ({
        date: '',
        poa: '',
        urine: '',
        sugeralbumin: '',
        pallor: '',
        oedemaankle: '',
        oedemafacial: '',
        160: '',
        150: '',
        140: '',
        130: '',
        120: '',
        110: '',
        100: '',
        90: '',
        80: '',
        70: '',
        60: '',
        50: '',
        fundalheight: '',
        foetallie: '',
        presentation: '',
        engagement: '',
        fm: '',
        fhs: '',
        iron: '',
        folate: '',
        calcium: '',
        vitaminc: '',
        supplementation: '',
        signature: '',
        designation: '',
        poaweight:'',
        weight:'',
        weightgain:'',
    })),
    Auscultation: Array(2).fill().map(() =>({
        auscultation:'',
        mentalHealth:'',
        T1:'',
        T2:'',
        T3:'',
        bloodsugerPoa:'',
        bloodsugerResult:'',
        haemoglobinPoa:'',
        haemoglobinResult:'',
        intendedhospital:'',
        transport:'',
        cost:'',
        distance:'',
        time:'',

    })),
    

    twoCell: Array(1).fill().map(() =>({
        respiratory:'',
        breast: '',
        examination:'',
        suger:'',
        haemoglobin:'',
        other:'',
        drugs:'',
        kick:'',
        bloodsample: '',
        poaBlood:'',
        dateBlood:'',
        referall:'',
        hiv:'',
        informedDate:'',
        companion:'',
        postPregnancy:'',
        milkBook:'',
        earlychildhood: '',
        familyPlanning:'',
        counselling:'',
        planningReason:'',
        consentdate:'',

    })),

    // Newly added sections
    clinicNumber: '',
    clinicalObservationTable: Array(13).fill().map(() => ({
      date: '',
      poa: '',
      weight: '',
      urine: '',
      oedema: '',
      bp: { systolic: '', diastolic: '' },
      fundalHeight: '',
      lie: '',
      presentation: '',
      fmFhs: { fm: '', fhs: '' },
      signature: '',
      designation: '',
      nextVisitDate: ''
    })),
    usScanTable: Array(15).fill().map(() => ({
      date: '',
      poa: '',
      ebw: '',
      crl: '',
      gestSac: '',
      bpd: '',
      hc: '',
      ac: '',
      fl: '',
      liguor: '',
      placenta: '',
      averagePoa: '',
      otherFindings: '',
      signature: '',
      designation: ''
    })),

    cardiac: '',
    pulmonary: '',
    riskFactors: '',
    managementPlan: '',
    clinicNotes: '',
    
    // Postanal care data
    hospital: '',
    birthWeight: '',
    poapostnatal: '',
    liveBirth: '',
    stillBirth: '',
    abnormalitiesDetected: '',
    dateOfDelivery: '',
    gender: '',
    modeOfDelivery:'',
    bloodPressure: '',
    episitomy: '',
    bodyTempNormal: '',
    vaginalExam: '',
    maternalComplications: '',
    episInfection: '',
    familyPlanning: '',
    postpartumSignals: '',
    breastfeedingEstablished: '',
    vitAMegadose: '',
    rubellaImmunization: '',
    antiD: '',
    diagnosisCard: '',
    chrd: '',
    prescription: '',
    referred: '',
    otherNotes: '',
    dateOfDischarge: '',
    signature: '',
    specialNotes: ''
  });

  
 useEffect(() => {
            console.log("in context")
           console.log(formData);
   }, [formData]);
   
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




