//modle
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schedulechange = new Schema({
    

    Email:{
        type: String,
        required: true,
        
    },

    Request:{
        type: String,
        required: true
    }

});

const SCchange= mongoose.model("shedulech",schedulechange);

export default SCchange;