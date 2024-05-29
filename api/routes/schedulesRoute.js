import express from 'express';
import schedule from '../models/schedule.js';
const router = express.Router();

router.route("/add").post((req, res) =>{
    const Date = req.body.Date;
    const Member_id = req.body.Member_id;
    const timeslot = req.body.timeslot;
    const Trainer_name = req.body.Trainer_name;
    const status = req.body.status;


    const newSchedule = new schedule({
    
        Date,
        Member_id,
        timeslot,
        Trainer_name,
        status
    
    });

    newSchedule.save().then(() => {
        res.json("Schedule Added")
    }).catch((err) =>{
        console.log(err);
    })




    });
    router.route("/").get((req, res) =>{
        schedule.find().then((schedules)=>{
            res.json(schedules)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json("Error: " + err);
        })
    
    
});

router.route("/update/:id").put(async (req, res) => {
    const { Date,
        Member_id,
        timeslot,
        Trainer_name,
        status } = req.body;
    const scheduleid = req.params.id;

    const updateschedule = {
        Date,
        Member_id,
        timeslot,
        Trainer_name,
        status
    };

    schedule.findByIdAndUpdate(scheduleid, updateschedule)
        .then(() => {
            res.json("Appointment updated successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    const scheduleid = req.params.id;

    schedule.findByIdAndDelete(scheduleid)
        .then(() => {
            res.json("Schedule deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});



router.route("/get/:Trainer_name").get(async (req, res) => {
    const trainerName = req.params.Trainer_name;
    try {
        // Query the database for schedules matching the trainer name
        const schedules = await schedule.find({ Trainer_name: trainerName });
        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'An error occurred while fetching schedules' });
    }
});

export default router;
