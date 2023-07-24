// User Schema
import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    urls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url',
    }]
});

//Export the model
const UserModel = mongoose.model('User', userSchema)

export default UserModel;