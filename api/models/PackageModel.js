import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    packageType : {
        type: String,
        required: true
    },

    packageName : {
        type: String,
        required: true
    },

    duration : {
        type : String,
        required: true
    },

    price : {
        type: Number,
        required : true
    },

    description : {
        type: String,
        required: true
    }
})

const Package = mongoose.model("Package", packageSchema);

export default Package;

