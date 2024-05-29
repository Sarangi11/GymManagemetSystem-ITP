import mongoose from 'mongoose';

const maintenanceSchema2 = new mongoose.Schema({

    EmpId :{
        type :String,
        required : true
    },
    Type0fEquipment :{
        type :String,
        required : true
    },

   Date : {
        type : String,
        required :true
    },

    Description : {
        type : String,
        required :true
    },

    
    

})
const maintenance = mongoose.model("maintenances", maintenanceSchema2);

export default maintenance;