import express from 'express';
const router = express.Router();
import maintenance  from "../models/Maintenancemodles.js";

router.route("/add").post((req, res) => {
    const EmpId = req.body.EmpId;
    const Type0fEquipment = req.body.Type0fEquipment;
    const Date = req.body.Date;
    const Description = req.body.Description;

    const newmaintenance = new maintenance({
        EmpId,
        Type0fEquipment,
        Date,
        Description,
    });

    newmaintenance.save().then(() => {
        res.json("Successful");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: "Error saving maintenance record" });
    });
});

router.route("/").get((req,res)=>{

    maintenance.find().then((maintenance) =>{
        res.json(maintenance)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/update/:id").put(async(req,res)=>{
    let maintenanceID = req.params.id;
    const{EmpId,Type0fEquipment,Date,Description } = req.body;

    const updatemaintenance = {
        EmpId,
        Type0fEquipment,
        Date,
        Description ,
    }
    const update = await maintenance.findByIdAndUpdate(maintenanceID,updatemaintenance)
    .then(() =>{
        res.status(200).send({status: "updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })

})

router.route("/delete/:id").delete(async(req,res) => {
    let maintenanceID = req.params.id;

    await maintenance.findByIdAndDelete(maintenanceID).then(() => {
        res.status(200).send({status: "deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the maintenance request", error: err.message});
    })
})



router.route("/get/:id").get(async(req,res) => {
    let maintenanceID = req.params.id;
    const user = await maintenance.findById(maintenanceID).then((maintenance) => {
        res.status(200).send({status: "maintenance request fetched", maintenance})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get maintenance request", error: err.message});
    })
})


export default router;
