const mongoose = require("mongoose");

const degreeSchema = new mongoose.Schema({
    degreeName: {
        type: String,
        required: true,
    },
    degreeType: {
        type: String,
        required: true,
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    }


});

const Degree = mongoose.model('Degree', degreeSchema);

module.exports = Degree;

/*
articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
*/
