const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Mongoose Schema and Model for Form 2
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
        counselling: String,
        planningreason: String,
        consentdate: String
    }],

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
}, { collection: 'Pregnancy_Form1_Record' });

const PregnancyForm1Model = mongoose.model('PregnancyForm1', pregnancyForm1Schema);

// Routes for Form 2
app.get('/api/pregnancy/:regNo', async (req, res) => {
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

// Routes for Form 1
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

        console.log(req.body);
        console.log("meka thama",registrationNumber);

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});