import express from 'express';
const router = express.Router();
import maintenance1  from "../models/Maintenace1modles.js";

router.route("/add").post((req,res)=>{
    
    const equipmentname  = req.body.equipmentname;
    const taskname = req.body.taskname;
    const description = req.body.description;
    const scheduledate = req.body.scheduledate;
    const completionstatus = req.body.completionstatus;
    

    const newmaintenance = new maintenance1({
        equipmentname,
        taskname,
        description, 
        scheduledate,
        completionstatus
    })

    newmaintenance.save().then(()=>{
        res.json("Successful")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    maintenance1.find().then((maintenance) =>{
        res.json(maintenance)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/update/:id").put(async(req,res)=>{
    let maintenanceID = req.params.id;
    const{equipmentname,taskname,description,scheduledate,completionstatus} = req.body;

    const updatemaintenance = {
        equipmentname,
        taskname,
        description,
        scheduledate,
        completionstatus,
    }
    const update = await maintenance1.findByIdAndUpdate(maintenanceID,updatemaintenance)
    .then(() =>{
        res.status(200).send({status: "updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })

})

router.route("/delete/:id").delete(async(req,res) => {
    let maintenanceID = req.params.id;

    await maintenance1.findByIdAndDelete(maintenanceID).then(() => {
        res.status(200).send({status: "deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the maintenance request", error: err.message});
    })
})



router.route("/get/:id").get(async(req,res) => {
    let maintenanceID = req.params.id;
    const user = await maintenance1.findById(maintenanceID).then((maintenance) => {
        res.status(200).send({status: "maintenance request fetched", maintenance})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get maintenance request", error: err.message});
    })
})


export default router;
