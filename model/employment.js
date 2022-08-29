const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const employmentSchema = new mongoose.Schema({
    userDefinedCode: {
        type: Number,
        trim: true,

    },
    joiningDate: {
        type: Date,
        trim: true
    },
    empGrade: {
        type: String,
        trim: true

    },
    finalAuthority: {
        type: Boolean,
        trim: true
    },
    hod: {
        type: Boolean,
        trim: true

    },
    linemanager: {
        type: Boolean,
        trim: true,

    },
    attendance: {
        type: Boolean,
       
    },
    location: {
        type: String,
        trim: true,

    },
    branch: {
        type: String,
        trim: true,

    },
    designation: {
        type: String,
        trim: true,

    },
     lineManager: {
        type: String,
        trim: true,

    },
     finalAuthority: {
        type: String,
        trim: true,

    },
    probationPeriod: {
        type: String,
        trim: true,

    },
    employee: {
        type: String,
        trim: true,

    },
    employmed: {
        type: String,
        trim: true,

    },
}, {
    timestamps: true, toJSON: { virtuals: false }
});

const employment = mongoose.model('employment', employmentSchema)

module.exports = employment