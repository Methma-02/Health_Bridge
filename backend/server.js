const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const { connectDB, waitForDB } = require('./config/database');
const { validateEnv } = require('./config/env');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();
validateEnv();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
    }
  }
}));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-role']
}));
app.options('*', cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.json());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to all routes
app.use(limiter);

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Authentication middleware
app.use((req, res, next) => {
  // In a real app, this would verify a token and set req.user
  // For now, we'll just mock a user for testing
  req.user = {
      role: req.headers['x-user-role'] || 'guest' // Get role from header or default to guest
  };
  next();
});

// Access control middleware
const canRead = (req, res, next) => {
  const userRole = req.user.role;
  if (['mother', 'physician', 'nurse', 'midwife', 'phm', 'admin'].includes(userRole)) {
      next();
  } else {
      res.status(403).json({ message: 'Forbidden: You do not have read access' });
  }
};

const canWrite = (req, res, next) => {
  const userRole = req.user.role;
  if (['physician', 'nurse', 'midwife', 'phm', 'admin'].includes(userRole)) {
      next();
  } else {
      res.status(403).json({ message: 'Forbidden: You do not have write access' });
  }
};

const canEditSensoryScreening = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole === 'mother') {
      next();
  } else {
      res.status(403).json({ message: 'Forbidden: You do not have access to edit sensory screening' });
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    // Skip health check endpoint
    if (req.path === '/health') {
      return next();
    }
    
    await waitForDB();
    next();
  } catch (error) {
    logger.error('Database connection middleware error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Try to import routes
try {
  // Import routes from test/dev branch
  const requestRoutes = require('./routes/requestRoutes');
  const donationRoutes = require('./routes/donationRoutes');
  const statsRoutes = require('./routes/statsRoutes');
  const authRoutes = require('./routes/auth');
  const userRoutes = require('./routes/users');
  const auditRoutes = require('./routes/audit');
  const monitorRoutes = require('./routes/monitor');

  // API routes
  app.use('/api/requests', requestRoutes);
  app.use('/api/donations', donationRoutes);
  app.use('/api/stats', statsRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/audit', auditRoutes);
  app.use('/api/monitor', monitorRoutes);
} catch (error) {
  logger.warn('Could not load some route modules:', error.message);
}

// ----------------- Pregnancy Schema and Routes (from HEAD) -----------------

// Pregnancy Schema
const pregnancySchema = new mongoose.Schema({
    regNo: { type: String, unique: true }, // Ensure regNo is unique
    regDate: String,
    regPlace: String,
    regFam: String,
    regArea: String,
    midwife: String,
    name: String,
    age: String,
    husbandName: String,
    husbandAge: String,
    address: String,
    contact: String,
    eduMother: String,
    eduFather: String,
    motherJob: String,
    distance: String,
    husbandJob: String,
    marriageAge: String,
    relative: String,
    vaccine: String,
    prenatal: String,
    folic: String,
    fertility: String,
    pregnancyNo: String,
    childNo: String,
    youngest: String,
    menstruation: String,
    hopedate: String,
    hopetime: String,
    fetal: String,
    noOfWeeks: String,
    famPlan: String,
    minOrMax: String,
    morePreg: String,
    bloodPressure: String,
    vaginalBleeding: String,
    fetusStatus: String,
    casualPosition: String,
    unknownDeliveryDate: String,
    other: String,
    bmi: String, 
    diabetes: String, 
    malaria: String, 
    heartProblems: String, 
    kidneyProblems: String, 
    otherProblems: String, 
    familyDiabetes: String, 
    familyBloodPressure: String, 
    hematologicalConditions: String,
    otherConditions: String,
    // Add the pregnancyHistory array field
    pregnancyHistory: [
        {
            id: Number,
            result: String,
            details: String,
            placeOfBirth: String,
            bornWeight: String,
            complications: String,
            age: String
        }
    ],

    // Prenatal field note for the second table
    prenatalFieldNote: [
        {
            id: Number,
            header: String,
            values: [String]
        }
    ],

    // ClinicForm fields
    dateOfVisit: String,
    weeksIntoPregnancy: String,
    weight: String,
    sugar: String,
    urine: String,
    albumin: String,
    security: String,
    swelling: String,
    bloodPressure: String,
    fetalHeight: String,
    location: String,
    fetalMovement: String,
    heartSounds: String,
    ironFolate: String,
    vitaminC: String,
    calciumTreatment: String,
    malletha: String,
    thripocha: String,
    testedBy: String,
    height: String,
    bmi: String,
    breastExamination: String,
    heartExamination: String,
    lungs: String,
    dentalDisaster: String,
    scrofula: String,
    wormTreatment: String,
    vrdlDates: String,
    vrdlResultDate: String,
    vrdlResult: String,
    referralDate: String,
    bloodClot: String,
    hemoglobin: String,
    bloodSugar: String,
    outpouringDate: String,
    batchNo: String,
    participatingClinics: String,
    mohClinic: Boolean,
    specialClinic: Boolean,
    privateClinic: Boolean,
    otherClinic: Boolean,
    reasonForOtherClinic: String,
    place: String,
    actionsTakenByMother: String,
    actionsTakenByFamilyHealthOfficer: String,
    birthPlace: String,
    birthDate: String,
    birthResult: String,
    institutionName: String,
    doneBy: String,
    dischargeDate: String,
    obstetricDetails: String,
    obstetricComplications: String,
    scratchesWound: Boolean,
    remainingApura: Boolean,
    prolongedLabour: Boolean,
    postpartumBleeding: Boolean,
    circumcisionDone: Boolean,
    otherComplications: Boolean,
    maternalDeathsDate: String,
    maternalDeathsReason: String,
    maternalDeathsInvestigated: Boolean,
    postnatalCareMotherTemperature: String,
    postnatalCareMotherSecurity: String,
    contractions: String,
    users: String,
    coralBlood: String,
    paulSmellingDischarge: String,
    discontinued: Boolean,
    mentalChanges: String,
    upperAbdominalPain: String,
    diarrhea: String,
    vomiting: String,
    difficultyBreathing: String,
    visualImpairment: String,
    painInTheGrain: String,
    childAbnormalities: String,
    fever: String,
    color: String,
    publicInfections: String,
    theWhite: String,
    breastfeedingObserved: String,
    mariloresMedicines: String,
    childsMedicine: String,
    peasantClinicDayAttendance: String,
    newbornScr: String,
    neonatalDeathsBelowDays: String,
    neonatalDeathsDays28: String,
    inspected: String,
    causeOfDeath: String,
    postpartumClinicAttendance: String,
    acceptedFamilyOrganizationSystem: String,
    ifNotAcceptedReturn: String
}, { collection: 'Pregnancy_Record' });

const PregnancyModel = mongoose.model('Pregnancy', pregnancySchema);

// Mongoose Schema and Model for Form 1
const pregnancyForm1Schema = new mongoose.Schema({
    bloodGroup: String,
    bmi: String,
    height: String,
    allergies: String,
    name: String,
    ageOfMother: String,
    nameOfHospitalClinic: String,
    nameOfConsultantObstetrician: String,
    mohArea: String,
    phmArea: String,
    nameOfFieldClinic: String,
    gramaNiladhariDivision: String,
    registrationNumber: { type: String, unique: true },
    registrationDate: String,

    // Risk Conditions
    antenatalRiskConditions: String,

    // Obstetric History
    gravidity: String,
    parity: String,
    childrenCount: String,
    ageOfYoungestChild: String,
    lastMenstrualPeriod: String,
    expectedDueDate: String,
    dateOf40WeeksCompletion: String,
    ultrasonographyCorrectEDD: String,
    periodOfArrivalAtDatingScan: String,
    dateOfQuickening: String,
    periodOfArrivalAtRegistration: String,

    // Screening and Immunization
    consanguinity: String,
    rubellaStatus: String,
    prePregnancyScreening: Boolean,
    preconceptionalFolicAcid: Boolean,
    subfertilityHistory: Boolean,
    plannedPregnancy: Boolean,
    lastFamilyPlanningMethod: String,

    // Wife's Personal Information
    wifeAge: String,
    wifeHighestEducationLevel: String,
    wifeOccupation: String,

    // Husband's Personal Information
    husbandAge: String,
    husbandHighestEducationLevel: String,
    husbandOccupation: String,

    // Family History (Nested Object)
    familyHistory: {
        diabetesMellitus: Boolean,
        hypertension: Boolean,
        haematologicalDiseases: Boolean,
        twinOrMultiplePregnancies: Boolean,
        otherConditions: String
    },

    // Medical/Surgical History (Nested Object)
    medicalConditions: {
        diabetes: Boolean,
        hypertension: Boolean,
        cardiacDiseases: Boolean,
        renalDiseases: Boolean,
        hepaticDiseases: Boolean,
        psychiatricIllnesses: Boolean,
        epilepsy: Boolean,
        malignancies: Boolean,
        haematologicalDiseases: Boolean,
        tuberculosis: Boolean,
        thyroidDiseases: Boolean,
        bronchialAsthma: Boolean
    },

    // Additional Medical History (Nested Object)
    additionalMedicalHistory: {
        previousDVT: Boolean,
        surgeriesOtherThanLSCS: Boolean,
        otherSpecificConditions: String
    },

    // Social Z Score
    socialZScore: String,

    // Past Obstetric History (Array of Objects)
    pastPregnancies: [{
        gravidity: String,
        placeAndModeOfDelivery: String,
        outcome: String,
        birthWeight: String,
        postnatalComplications: String,
        sex: String,
        age: String
    }],

    // Visits (Array of Objects)
    visits: [{
        date: String,
        poa: String,
        urine: String,
        sugeralbumin: String,
        pallor: String,
        oedemaankle: String,
        oedemafacial: String,
        160: String,
        150: String,
        140: String,
        130: String,
        120: String,
        110: String,
        100: String,
        90: String,
        80: String,
        70: String,
        60: String,
        50: String,
        fundalheight: String,
        foetallie: String,
        presentation: String,
        engagement: String,
        fm: String,
        fhs: String,
        iron: String,
        folate: String,
        calcium: String,
        vitaminc: String,
        supplementation: String,
        signature: String,
        designation: String,
        poaweight: String,
        weight: String,
        weightgain: String
    }],

    // Auscultation (Array of Objects)
    Auscultation: [{
        auscultation: String,
        mentalHealth: String,
        T1: String,
        T2: String,
        T3: String,
        bloodsugerPoa: String,
        bloodsugerResult: String,
        haemoglobinPoa: String,
        haemoglobinResult: String,
        intendedhospital: String,
        transport: String,
        cost: String,
        distance: String,
        time: String
    }],

    // TwoCell (Array of Objects)
    twoCell: [{
        respiratory: String,
        breast: String,
        examination: String,
        suger: String,
        haemoglobin: String,
        other: String,
        drugs: String,
        kick: String,
        bloodsample: String,
        poaBlood: String,
        dateBlood: String,
        referall: String,
        hiv: String,
        informedDate: String,
        companion: String,
        postPregnancy: String,
        milkBook: String,
        earlychildhood: String,
        familyPlanning: String,
        counsellingdate: String,
        planningreason: String,
        consentdate: String
    }],
    result: String,
    chosenmethod: String,
    // Newly added fields
    clinicNumber: String,
    clinicalObservationTable: [{
        date: String,
        poa: String,
        weight: String,
        urine: String,
        oedema: String,
        bp: {
            systolic: String,
            diastolic: String
        },
        fundalHeight: String,
        lie: String,
        presentation: String,
        fmFhs: {
            fm: String,
            fhs: String
        },
        signature: String,
        designation: String,
        nextVisitDate: String
    }],
    usScanTable: [{
        date: String,
        poa: String,
        ebw: String,
        crl: String,
        gestSac: String,
        bpd: String,
        hc: String,
        ac: String,
        fl: String,
        liguor: String,
        placenta: String,
        averagePoa: String,
        otherFindings: String,
        signature: String,
        designation: String
    }],
        cardiac: String,
        pulmonary: String,
        riskFactors: String,
        managementPlan: String,
        clinicNotes: String,

        // Postnatal Care Fields
        hospital: String,
        birthWeight: String,
        poapostnatal: String,
        liveBirth: String,
        stillBirth: String,
        abnormalitiesDetected: String,
        dateOfDelivery: String,
        gender: String,
        modeOfDelivery: String,
        bloodPressure: String,
        episitomy: String,
        bodyTempNormal: String,
        vaginalExam: String,
        maternalComplications: String,
        episInfection: String,
        familyPlanning: String,
        postpartumSignals: String,
        breastfeedingEstablished: String,
        vitAMegadose: String,
        rubellaImmunization: String,
        antiD: String,
        diagnosisCard: String,
        chrd: String,
        prescription: String,
        referred: String,
        otherNotes: String,
        dateOfDischarge: String,
        deliverySignature: String,
        signature: String,
        specialNotes: String,

        // New Fields from PregnancyRecodForm
        postPartumMorbidities: String,
        zScore: String,
        homeVisitDates: [String], // Array of strings for dates
        micronutrientsIssueDates: [String], // Array of strings for dates
        postpartumClinicDate: String,
        postpartumClinicPlace: String,
        clinicDate: String,
        breastProblems: String,
        vaginalDischarge: String,
        excessiveVaginalBleeding: String,
        pallor: String,
        icterus: String,
        oedema: String,
        bp: String,
        cardiovascularSystem: String,
        respiratorySystem: String,
        abdominalExamination: String,
        vaginalExamination: String,
        mentalStatusEPDS: String,
        otherNotes: String,
        identifiedProblems: String,
        familyPlanningMethodInUse: String,
        familyPlanningChosen: String,
        familyPlanningNotUsingReason: String,
        familyPlanningClinicPlace: String,
        familyPlanningClinicDate: String,
        familyPlanningClinicTime: String,
        familyPlanningSpecialNotes: String,
        emergencyContactName: String,
        emergencyContactTelephone: String,
        phmTelephone: String,
        mohOfficeTelephone: String,
        officerSignature: String,
        officerDesignation: String,

         // Referrals (Array of Objects)
         referrals: [{
            text: { type: String, required: true },
            date: { type: String, required: true },
            type: { type: String, required: true }
        }],
        bmiChartPoints: [{
            x: Number, // X-coordinate (e.g., POA in weeks)
            y: Number, // Y-coordinate (e.g., weight gain in kg)
        }],
        fundalHeightPoints: [{
            x: Number, // X-coordinate (e.g., POA in weeks)
            y: Number, // Y-coordinate (e.g., weight gain in kg)
        }],

        // Date Tables Data
        dateTablesData: [{
            title: String,
            rows: Number,
            cols: Number,
            data: [[String]] // 2D array of strings for dates
        }],

        // Immunization Data
        immunizationData: {
            dates: [String], // Array of strings for dates
            batchNumbers: [String], // Array of strings for batch numbers
        },

        dentalCare: {
            referredDate: String,
            examinationDate: String,
            treatment: String,
        },
        
}, { collection: 'Pregnancy_Form1_Record' });

const PregnancyForm1Model = mongoose.model('PregnancyForm1', pregnancyForm1Schema);

// Routes for Pregnancy Form 2
app.get('/api/pregnancy/:regNo' ,async (req, res) => {
    try {
        const { regNo } = req.params;
        const record = await PregnancyModel.findOne({ regNo });

        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch data.' });
    }
});

app.post('/api/pregnancy', async (req, res) => {
    try {
        const { regNo } = req.body;

        // Check if a record with the same regNo exists
        const existingRecord = await PregnancyModel.findOne({ regNo });

        if (existingRecord) {
            // Update the existing record
            const updatedRecord = await PregnancyModel.findOneAndUpdate(
                { regNo },
                req.body,
                { new: true }
            );
            res.status(200).json({ message: 'Record updated successfully!', record: updatedRecord });
        } else {
            // Create a new record
            const newRecord = new PregnancyModel(req.body);
            await newRecord.save();
            res.status(201).json({ message: 'Record created successfully!', record: newRecord });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data.' });
    }
});

// Routes for Pregnancy Form 1
app.get('/api/pregnancy-form1/:registrationNumber', async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const record = await PregnancyForm1Model.findOne({ registrationNumber });

        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch data.' });
    }
});

app.post('/api/pregnancy-form1', async (req, res) => {
    try {
        const { registrationNumber } = req.body;

        // Check if a record with the same registrationNumber exists
        const existingRecord = await PregnancyForm1Model.findOne({ registrationNumber });

        if (existingRecord) {
            // Update the existing record
            const updatedRecord = await PregnancyForm1Model.findOneAndUpdate(
                { registrationNumber },
                req.body,
                { new: true }
            );
            res.status(200).json({ message: 'Record updated successfully!', record: updatedRecord });
        } else {
            // Create a new record
            const newRecord = new PregnancyForm1Model(req.body);
            await newRecord.save();
            res.status(201).json({ message: 'Record created successfully!', record: newRecord });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data.' });
    }
});

// ----------------- Baby Schema and Routes (from test/dev) -----------------

// Baby Schema
const BabySchema = new mongoose.Schema({
  regNo: { type: String, unique: true }, // Ensure regNo is unique
  birthData: [{
      healthDivision: String,
      postPregnancyDivision: String,
      id: String,
      dob: Date,
      registeredDate: Date,
      mother: String,
      age: String,
      address: String,
  }],
  babyCare: [{
      apga: {
          "1M": String,
          "2M": String,
          "3M": String,
      },
      birthWeight: String,
      headCircumference: String,
      birthHeight: String,
      infantHealth: String,
      vitaminK: String,
  }],
  specialNeeds: [{
      premature: { checked: Boolean, date: Date },
      underWeight: { checked: Boolean, date: Date },
      neonatalComplications: { checked: Boolean, date: Date },
      congenitalDiseases: { checked: Boolean, date: Date },
      afterBirthDiseases: { checked: Boolean, date: Date },
      powderMilk: { checked: Boolean, date: Date },
      growthStunting: { checked: Boolean, date: Date },
      feedingComplications: { checked: Boolean, date: Date },
      parentalDeath: { checked: Boolean, date: Date },
      parentalImmigration: { checked: Boolean, date: Date },
      other: { checked: Boolean, date: Date },
  }],
  healthDetails: [{
      skinColor: String,
      eyes: String,
      navel: String,
      breastFeeding: String,
      nursing: {
          position: String,
          connection: String,
      },
      Other: String,
  }],
  clinicDays: [],
  WeightGainData: [{
      gender: String,
      measurements: [
          {
              x: Number,
              y: Number
          }
      ],
  }],
  HeightGainData: [{
      gender: String,
      measurements: [
          {
              x: Number,
              y: Number
          }
      ],
  }],
  heightOtherData: [{
      "date the phm came": Date,
      "other dates": Date,
      "Family planning": String,
  }],
  weightOtherData: [{
      "date the phm came": Date,
      "other dates": Date,
      "Family planning": String,
  }],
  immunizationRecords: {
      vaccineSchedule: [
          {
              age: String,
              vaccines: [
                  {
                      name: String,
                      date: Date,
                      batchNo: String,
                      bcgScar: {
                          type: String,
                          enum: ['present', 'absent', ''],
                          default: ''
                      },
                      adverseEffects: {
                          type: Boolean,
                          default: false
                      }
                  }
              ]
          }
      ],
  },
  sensoryScreening: {
      vision: {
          "Birth to one week": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 2 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 6 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 10 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 12 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ]
      },
      hearing: {
          "Shortly after birth": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 1 month": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 4 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 7 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 9 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ],
          "At 12 months": [
              {
                  question: String,
                  answer: Boolean
              }
          ]
      },
  },
  developmentMilestones: [
      {
          age: String,
          milestones: [
              {
                  milestone: String,
                  month: String,        // Month when the milestone was observed
                  monthProved: String,  // Month when the milestone was confirmed
                  officer: String       // Officer's designation
              }
          ],
      }
  ],
  childHealthRecords: [
      {
          age: String, // Age stage (e.g., "1 month", "2 months", etc.)
          clinicDate: String, // Date of the clinic visit
          head: String, // Head measurements or observations
          disabilities: String, // Any disabilities noted
          eyes: String, // Eye health observations
          sight: String, // Sight-related observations
          nightBlindness: String, // Night blindness observations
          dental: String, // Dental health observations
          issues: String, // Other health issues
          growth: String, // Growth observations
          heartDiseases: String, // Heart disease observations
          sandiya: String, // Sandiya-related observations
          other: String, // Other observations
          signature: String, // Officer's signature
          designation: String, // Officer's designation
         
      }
  ],
  studentHealthRecords: [
      {
          date: String, // Date of the health check
          age: String, // Age of the student
          height: String, // Height of the student
          weight: String, // Weight of the student
          BMI: String, // Body Mass Index
          stunting: String, // Stunting observations
          wasting: String, // Wasting observations
          obesity: String, // Obesity observations
          vitaminEDeficiency: String, // Vitamin E deficiency
          bloodDeficiency: String, // Blood deficiency
          strabismus: String, // Strabismus (eye misalignment)
          leftEyeSight: String, // Left eye sight
          rightEyeSight: String, // Right eye sight
          leftHearing: String, // Left hearing
          rightHearing: String, // Right hearing
          speaking: String, // Speaking ability
          dentalTrauma: String, // Dental trauma
          dentalIssues: String, // Dental issues
          flurosis: String, // Dental flurosis
          goiter: String, // Goiter (thyroid swelling)
          defectsInThroatEarsOrNose: String, // Defects in throat, ears, or nose
          insensitiveMarks: String, // Insensitive marks
          osteoporosis: String, // Osteoporosis
          heart: String, // Heart health
          lungs: String, // Lung health
          teacherSupport: String, // Teacher support
          attendanceBelow75: String, // Attendance below 75%
          academicallyStruggling: String, // Academically struggling
          otherDisabilities: String, // Other disabilities (consulting the teacher)
          dewormingPillsAndMicronutrientSupplements: String, // Deworming pills & micronutrient supplements given by school
          dateGiven: String, // Date given
          dewormingPills: String, // Deworming pills
          vitaminAOverdose: String, // Vitamin A overdose
          iron: String, // Iron supplements
          folicAcid: String, // Folic acid supplements
          otherDrugs: String, // Other drugs
          signatureOfOfficer: String, // Signature of the officer
      }
  ],
  hospitalizations: [
      {
          date: String, // Date of hospitalization
          reason: String, // Reason for hospitalization
          disease: String, // Disease or condition
          result: String, // Result or outcome
      }
  ],
  referrals: [
      {
          date: String, // Date of referral
          reason: String, // Reason for referral
          place: String, // Place referred to
          result: String, // Result or outcome
      }
  ],
}, { collection: 'Baby_Record' });

const BabyModel = mongoose.model('Baby', BabySchema);

// Routes for Baby
app.get('/api/baby/:regNo', canRead, async (req, res) => {
  try {
      const { regNo } = req.params;
      const record = await BabyModel.findOne({ regNo });

      if (record) {
          res.status(200).json(record);
      } else {
          res.status(404).json({ message: 'Record not found' });
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Failed to fetch data.' });
  }
});

app.post('/api/baby', canWrite, async (req, res) => {
  try {
      const { regNo } = req.body;

      // Check if a record with the same regNo exists
      const existingRecord = await BabyModel.findOne({ regNo });

      if (existingRecord) {
          // Update the existing record
          const updatedRecord = await BabyModel.findOneAndUpdate(
              { regNo },
              req.body,
              { new: true }
          );
          res.status(200).json({ message: 'Record updated successfully!', record: updatedRecord });
      } else {
          // Create a new record
          const newRecord = new BabyModel(req.body);
          await newRecord.save();
          res.status(201).json({ message: 'Record created successfully!', record: newRecord });
      }
  } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Failed to save data.' });
  }
});

app.put('/api/baby/:regNo/sensoryScreening', canEditSensoryScreening, async (req, res) => {
  try {
      const { regNo } = req.params;
      const updatedRecord = await BabyModel.findOneAndUpdate(
          { regNo },
          { $set: { sensoryScreening: req.body.sensoryScreening } },
          { new: true }
      );

      if (updatedRecord) {
          res.status(200).json({ message: 'Sensory screening updated successfully!', record: updatedRecord });
      } else {
          res.status(404).json({ message: 'Record not found' });
      }
  } catch (error) {
      console.error('Error updating sensory screening:', error);
      res.status(500).json({ message: 'Failed to update sensory screening.' });
  }
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
  logger.info('Received shutdown signal');
  
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  try {
    await mongoose.connection.close();
    logger.info('Database connections closed');
    process.exit(0);
  } catch (err) {
    logger.error('Error during shutdown:', err);
    process.exit(1);
  }
}

// Start server
async function startServer() {
  try {
    // Connect to database with retry logic
    let retries = 5;
    while (retries > 0) {
      try {
        if (typeof connectDB === 'function') {
          await connectDB();
        } else {
          // Fall back to direct mongoose connection if connectDB isn't available
          await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('Connected to MongoDB');
        }
        break; // Connection successful
      } catch (err) {
        retries--;
        if (retries === 0) {
          throw err; // No more retries, propagate error
        }
        logger.warn(`Database connection failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
      }
    }
    
    const server = app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error('Unhandled Promise rejection:', err);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app; // For testing purposes