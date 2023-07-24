// INVALID TOKEN SCHEMA
import mongoose from 'mongoose';

const InvalidatedToken = mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true })


const InvalidatedTokenModel = mongoose.model('Token', InvalidatedToken)

export default InvalidatedTokenModel