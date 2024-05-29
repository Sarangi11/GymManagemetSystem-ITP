import express from 'express';
const router = express.Router();
import workoutplan  from "../models/Threedaymodle.js" ;

router.route("/add").post((req, res) => {

    
    const Email= req.body.Email;
    const CustomerId = req.body.CustomerId;
    const Gender = req.body.Gender;
    const exercises1  = req.body.exercises1;
    const exercises2 = req.body.exercises2;
    const exercises3 = req.body.exercises3;


    if (!Email ||!CustomerId ||  !Gender || !exercises1 || !exercises2 || !exercises3 || !Array.isArray(exercises1) || !Array.isArray(exercises2) || !Array.isArray(exercises3)) {
        return res.status(400).json({ error: "Missing or invalid fields in the request." });
    }

    const invalidExercise1 = exercises1.find(({ exercise, reps }) => !exercise || isNaN(reps));
    if (invalidExercise1) {
        return res.status(400).json({ error: "Invalid exercise data." });
    }

    const invalidExercise2 = exercises2.find(({ exercise, reps }) => !exercise || isNaN(reps));
    if (invalidExercise2) {
        return res.status(400).json({ error: "Invalid exercise data." });
    }

    const invalidExercise3 = exercises3.find(({ exercise, reps }) => !exercise || isNaN(reps));
    if (invalidExercise3) {
        return res.status(400).json({ error: "Invalid exercise data." });
    }
    

    const newWorkout = new workoutplan({
        
        Email,
        CustomerId,
        Gender,
        exercises1,
        exercises2,
        exercises3

    });

    
    newWorkout.save().then(() => {
        res.json("workout plan added");
    }).catch(err => {
        console.log(err);
    });


});

router.route("/").get((req, res) => {

    workoutplan.find().then((workouts) => {
        res.json(workouts)

    }).catch((err) => {
        console.log(err);
    })
});

router.route("/trainer/:email").get((req, res) => {
    const trainerEmail = req.params.email;
    workoutplan.find({ Email: trainerEmail }).then((workouts) => {
        res.json(workouts)
    }).catch((err) => {
        console.log(err);
    })
})


router.route("/update/:id").put(async (req, res) => {
    try {
        const workoutId = req.params.id;
        const { exercises1,exercises2,exercises3 } = req.body;

        if (!Email ||!CustomerId || !Gender || !exercises1 || !exercises2 || !exercises3 || !Array.isArray(exercises1) || !Array.isArray(exercises2) || !Array.isArray(exercises3)) {
            return res.status(400).json({ error: "Missing or invalid fields in the request." });
        }

        const invalidExercise1 = exercises1.find(({ exercise, reps }) => !exercise || isNaN(reps));
    if (invalidExercise1) {
        return res.status(400).json({ error: "Invalid exercise data." });
    }

    const invalidExercise2 = exercises2.find(({ exercise, reps }) => !exercise || isNaN(reps));
    if (invalidExercise2) {
        return res.status(400).json({ error: "Invalid exercise data." });
    }

    const invalidExercise3 = exercises3.find(({ exercise, reps }) => !exercise || isNaN(reps));
    if (invalidExercise3) {
        return res.status(400).json({ error: "Invalid exercise data." });
    }

        // Update the workout plan
        await workoutplan.findByIdAndUpdate(workoutId, { exercises1,exercises2,exercises3 });
        res.status(200).json({ status: "Workout plan updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error updating workout plan." });
    }
});


router.route("/delete/:id").delete(async(req, res) => {
    let userid = req.params.id;

    await workoutplan.findByIdAndDelete(userid).then(() => {
        res.status(200).send({status:"workout plan deleted"});
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({status:"Error with deleting",error:err.message});
    });
})

router.route("/get/:id").get(async (req, res) => {
    let uid = req.params.id;
    const work=await workoutplan.findById(uid).then((user) => {
        res.status(200).send({status:"workout plan fetched",user})
    }).catch(err => {
        console.log(err.message);
        res.status(err.status).send({status:"Error with get workoutplan",error:err.message});
    })
})

export default router; 