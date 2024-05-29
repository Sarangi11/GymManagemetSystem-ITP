import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    custName : {
        type: String,
        required: true
    },

    proEmail : {
        type: String,
        required: true
    },

    proPhone : {
        type: String,
        required : true
    },

    proDate : {
        type : String,
        required: true
    },

    selectedProPackage : {
        type : String,
        required: true
    }
})

const Package = mongoose.model("Promotional Package Order", packageSchema);

export default Package;

