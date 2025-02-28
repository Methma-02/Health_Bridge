const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { X } = require('lucide-react');

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

const BabySchema = new mongoose.Schema({
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
  clinicDays: [Date],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  weightGainData: [{
    gender: String,
    measurements: [
      {
        x: Number,  // Week number
        y: Number   // Weight gain in kg
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  HeightGainData:[{
    gender:String,
    measurements:[
      {
        x: Number,
        y: Number
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
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
            }}]
      }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }},
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
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
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
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
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
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
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
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    hospitalizations: [
      {
        date: String, // Date of hospitalization
        reason: String, // Reason for hospitalization
        disease: String, // Disease or condition
        result: String, // Result or outcome
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    referrals: [
      {
        date: String, // Date of referral
        reason: String, // Reason for referral
        place: String, // Place referred to
        result: String, // Result or outcome
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]  
});

const Baby = mongoose.model('Baby', BabySchema);
module.exports = Baby;