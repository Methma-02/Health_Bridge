const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const MONGO_URI = "mongodb+srv://asd:Randina123@health.gfyq3.mongodb.net/Health_Bridge";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Mongoose Schema and Model
const pregnancySchema = new mongoose.Schema({
    regNo: String,
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
});

// Explicitly specify the collection name as 'Pregnancy_Record'
const PregnancyModel = mongoose.model('Pregnancy', pregnancySchema, 'Pregnancy_Record');

// API Endpoint to Save Data
app.post('/api/pregnancy', async (req, res) => {
    try {
        const newRecord = new PregnancyModel(req.body);
        await newRecord.save();
        res.status(201).json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});