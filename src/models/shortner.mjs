// Shortener_Model
import mongoose from 'mongoose';

// url shortener schema
const Url_Shortener = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    long_url: {
        type: String,
        trim: true
    },
    create_your_short_url: {
        type: String,
        trim: true
    }
}, { timestamps: true })

// creating a model
const Shortener_Model = mongoose.model('Url', Url_Shortener);

// export the Shortener_Model
export default Shortener_Model


