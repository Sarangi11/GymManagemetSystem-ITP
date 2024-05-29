import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MonthlyReportSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        
    },
    
    total_number_of_trainers :
         { type: Number},
    total_number_of_clients:
    { type: Number}, 
    new_clients_acquired:
    { type: Number} ,
    client_retention_rate:
    {type: String},
    total_sessions_conducted:
    { type: Number},
    average_attendance_rate:
    { type: String} ,
    
    trainer_performance: [{
        trainer_name:{type: String},
        number_of_clients:  { type: Number},
        new_clients_acquired: { type: Number},
        sessions_conducted:  { type: Number},
        average_attendance_rate: {type: String}
    }],
    highlights: {
        type: String
    },
    challenges: {
        type: String
    },
    goals_for_next_month: {
        type: String,
        
    },
    revenue: {
        type: Number
    },
    additional_notes: {
        type:String
    },
    conclusion:{
        type:String} 
});

const MonthlyReport = mongoose.model("MonthlyReport", MonthlyReportSchema);
export default MonthlyReport;
