import express from 'express';
const router = express.Router();
import  userProPackage from "../models/userProPkgModel.js";

//insert part

router.route("/add").post((req, res) => {
    const custName = req.body.custName;
    const proEmail = req.body.proEmail;
    const proPhone = req.body.proPhone;
    const proDate = req.body.proDate;
    const selectedProPackage = req.body.selectedProPackage;
    
    const newPackage = new userProPackage({
        custName,
        proEmail,
        proPhone,
        proDate,
        selectedProPackage
    })

    newPackage.save().then(() => {
        res.json("Order Added")
    }).catch((err) => {
        console.log(err);
    })
})

//read part

router.route("/").get((req,res) => {
    userProPackage.find().then((packages) => {
        res.json(packages)
    }).catch((err) => {
        console.log(err)
    })
})

//delete part

router.route("/delete/:id").delete(async(req,res) => {
    let packageId = req.params.id;

    await userProPackage.findByIdAndDelete(packageId).then(() => {
        res.status(200).send({status: "Order deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the order", error: err.message});
    })
})

//get details by an id

router.route("/get/:id").get(async(req,res) => {
    let packageId = req.params.id;
    const user = await userProPackage.findById(packageId).then((Package) => {
        res.status(200).send({status: "Order fetched", Package})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get Order", error: err.message});
    })
})

export default router;