const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema(
    {
    email: { type: String, required: true, unique: true, lowercase: true},
    username: { type: String, required: true, unique: true, lowercase: true},
    passhash: { type: String, required: true},
    name: { type: String, required: true},
    ref: { type: String, required: true},
    totalrefs: {type: Number, required: true, default: 0},
    amount: {type: Number, required: true, default: 0},
    phone: {type: String, required: true, minLength: [10, "Phone number should have minimum 10 digits"], maxLength: [10, "Phone number should have maximum 10 digits"], match: [/\d{10}/, "Phone number should only have digits"] },
    withdrawn: {type: Number, required: true, default: 0},
    totalamount: {type: Number, required: true, default: 0},
    upi: {type: String, required: true, default: "Your_UPI_ID@upi"},
    isActive: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, default: false }
    },
    {
    collection: 'users'
    }
)


const model = mongoose.model('UserSchema', UserSchema)


module.exports = model