const mongoose = require("mongoose");

const studentSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        // maxlength: [20, "Name cannot be more than 20 characters"]
    },
    file: {
        type: String,
        required: [true, "Please provide a file"]
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
    }
});

const StudentSubmission = mongoose.model("StudentSubmission", studentSubmissionSchema);

module.exports = StudentSubmission;