import express from 'express';
const router = express.Router();
import  Schedule from  "../models/ScheduleChange.js";

router.route("/add").post((req, res) => {

    
    const Email= req.body.Email;
    const Request = req.body.Request;
    

    if (!Email || !Request) {
        return res.status(400).json({ error: "Email and Request are required fields." });
    }

    const newSchedule = new Schedule({
        
        Email,
        Request
            
    });

    
    newSchedule.save().then(() => {
        res.json("Request Send");
    }).catch(err => {
        console.log(err);
    });

    router.route("/").get((req, res) =>{
        Schedule.find().then((Schedules)=>{
            res.json(Schedules)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json("Error: " + err);
        })
      
});
router.route("/delete/:id").delete(async (req, res) => {
    const scheduleid = req.params.id;

    Schedule.findByIdAndDelete(scheduleid)
        .then(() => {
            res.json("Schedule request deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});



});

export default router;

