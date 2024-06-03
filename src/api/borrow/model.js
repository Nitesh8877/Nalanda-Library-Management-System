const { Schema, model } = require('mongoose');

const BorrowSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate: {
        type: Date
    }
}, { timestamps: true });

const Borrow = model('Borrow', BorrowSchema);

module.exports = Borrow;
