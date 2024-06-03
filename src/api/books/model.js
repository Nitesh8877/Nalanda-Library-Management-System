const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    numberOfCopies: {
        type: Number,
        required: true,
        min: 0
    },
    borrowedCount: {
        type: Number,
        default: 0
    },
     createdBy:{
        type:Schema.Types.ObjectId
    },
    updatedBy:{
        type:Schema.Types.ObjectId
    }
}, { timestamps: true });

const Book = model('Book', BookSchema);

module.exports = Book;
