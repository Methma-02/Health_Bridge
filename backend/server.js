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

// Mongoose Schema and Model
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
    bloodPressure: String, // New field
    vaginalBleeding: String, // New field
    fetusStatus: String, // New field
    casualPosition: String, // New field
    unknownDeliveryDate: String, // New field
    other: String, // New field
}, { collection: 'Pregnancy_Record' });

const PregnancyModel = mongoose.model('Pregnancy', pregnancySchema);

// Routes
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});