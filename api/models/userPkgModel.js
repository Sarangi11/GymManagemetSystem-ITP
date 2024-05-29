import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    cusName : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true
    },

    phone : {
        type: String,
        required : true
    },

    date : {
        type : String,
        required: true
    },

    selectedPackage : {
        type : String,
        required: true
    }
})

const Package = mongoose.model("Package Order", packageSchema);

export default Package;

