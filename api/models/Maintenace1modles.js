import mongoose from 'mongoose';

const maintenanceSchema1 = new mongoose.Schema({
    equipmentname :{
        type : String,
        required : true
    },

    taskname :{
        type :String,
        required : true
    },

    description: {
        type : String,
        required :true
    },

    scheduledate: {
        type : String,
        required :true
    },
    completionstatus: {
        type : String,
        required :true
    }
})
const maintenance1 = mongoose.model("Task", maintenanceSchema1);

export default maintenance1;