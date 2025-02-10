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
    registrationNumber: { type: String, unique: true }, // Ensure registrationNumber is unique
    registrationDate: String,
    antenatalRiskConditions: String,
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
    consanguinity: String,
    rubellaSatus: String,
    prePregnancyScreening: Boolean,
    preconceptionalFolicAcid: Boolean,
    subfertilityHistory: Boolean,
    plannedPregnancy: Boolean,
    lastFamilyPlanningMethod: String,
    wifeAge: String,
    wifeHighestEducationLevel: String,
    wifeOccupation: String,
    husbandAge: String,
    husbandHighestEducationLevel: String,
    husbandOccupation: String,
    familyHistory: {
        diabetesMelllitus: Boolean,
        hypertension: Boolean,
        haematologicalDiseases: Boolean,
        twinOrMultiplePregnancies: Boolean,
        otherConditions: String
    },
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
    additionalMedicalHistory: {
        previousDVT: Boolean,
        surgeriesOtherThanLSCS: Boolean,
        otherSpecificConditions: String
    },
    socialZScore: String,
    pastPregnancies: [{
        gravidity: String,
        placeAndModeOfDelivery: String,
        outcome: String,
        birthWeight: String,
        postnatalComplications: String,
        sex: String,
        age: String
    }]
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