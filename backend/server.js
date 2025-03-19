
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

// Authentication middleware (this is just a placeholder - you'll need to implement actual authentication)
app.use((req, res, next) => {
    // In a real app, this would verify a token and set req.user
    // For now, we'll just mock a user for testing
    req.user = {
        role: req.headers['x-user-role'] || 'guest' // Get role from header or default to guest
    };
    next();
});

// Middleware to check if the user has read access
const canRead = (req, res, next) => {
    const userRole = req.user.role; // Assuming the user role is attached to the request object
    if (['mother', 'physician', 'nurse', 'midwife', 'phm', 'admin'].includes(userRole)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have read access' });
    }
};

// Middleware to check if the user has write access
const canWrite = (req, res, next) => {
    const userRole = req.user.role;
    if (['physician', 'nurse', 'midwife', 'phm', 'admin'].includes(userRole)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have write access' });
    }
};

// Middleware to check if the user can edit sensory screening
const canEditSensoryScreening = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 'mother') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have access to edit sensory screening' });
    }
};

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

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
// Route to get baby record
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

// Route to create or update baby record
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

// Route to edit sensory screening
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
=======
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const { connectDB, waitForDB } = require('./config/database');
const { validateEnv } = require('./config/env');
const logger = require('./utils/logger');


// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const auditRoutes = require('./routes/audit');
const monitorRoutes = require('./routes/monitor');

// Middleware
const { errorHandler } = require('./middleware/errorHandler');

require('dotenv').config();
validateEnv();

const app = express();

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

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health check endpoint - keep this before DB middleware
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Database connection middleware - now placed BEFORE routes
app.use(async (req, res, next) => {
  try {
    // Skip health check endpoint (redundant check, but kept for safety)
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

// API routes - registered ONLY ONCE
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/monitor', monitorRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

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
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to database with retry logic
    let retries = 5;
    while (retries > 0) {
      try {
        await connectDB();
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

startServer();

module.exports = app; // For testing purposes

