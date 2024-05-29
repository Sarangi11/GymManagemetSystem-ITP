import express from 'express';
import  DoctorAppointment from "../models/AppointmentModles.js";
const router = express.Router();

router.route("/add").post((req, res) => {
    const { name,DoctorName, age, gender, date, time } = req.body;

    const newAppointment = new DoctorAppointment({
        name,
        DoctorName,
        age,
        gender,
        date,
        time,
       
    });

    newAppointment.save()
        .then(() => {
            res.json("Appointment added successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/").get((req, res) => {
    DoctorAppointment.find()
        .then((appointments) => {
            res.json(appointments);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/update/:id").put(async (req, res) => {
    const { name,DoctorName, age, gender, date, time } = req.body;
    const appointmentID = req.params.id;

    const updateAppointment = {
        name,
        DoctorName,
        age,
        gender,
        date,
        time,
    };

    DoctorAppointment.findByIdAndUpdate(appointmentID, updateAppointment)
        .then(() => {
            res.json("Appointment updated successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    const appointmentID = req.params.id;

    DoctorAppointment.findByIdAndDelete(appointmentID)
        .then(() => {
            res.json("Appointment deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

router.route("/get/:id").get(async (req, res) => {
        let uid = req.params.id;
        const work=await DoctorAppointment.findById(uid).then((user) => {
            res.status(200).send({status:"DoctorAppointment plan fetched",user})
        }).catch(err => {
            console.log(err.message);
            res.status(err.status).send({status:"Error with get workoutplan",error:err.message});
        })    
});

export default router;
