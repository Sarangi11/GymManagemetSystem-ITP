import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const doctorAppointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    DoctorName:{
        type: String,
    },
    age: {
        type: Number,
        
    },
    gender: {
        type: String,
        
        
    },
    date: {
        type: Date,
        
    },
    time: {
        type: String,
        
    },
    
});

const DoctorAppointment = mongoose.model("appointment", doctorAppointmentSchema);

export default DoctorAppointment;
