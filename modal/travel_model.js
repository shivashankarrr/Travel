const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelDiarySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const TravelDiary = mongoose.model('TravelDiary', TravelDiarySchema);

module.exports = TravelDiary;
