import express from 'express';
const router = express.Router();
import  userPackage from "../models/userPkgModel.js";

//insert part

router.route("/add").post((req, res) => {
    const cusName = req.body.cusName;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const selectedPackage = req.body.selectedPackage;
    
    const newPackage = new userPackage({
        cusName,
        email,
        phone,
        date,
        selectedPackage
    })

    newPackage.save().then(() => {
        res.json("Order Added")
    }).catch((err) => {
        console.log(err);
    })
})

//read part

router.route("/").get((req,res) => {
    userPackage.find().then((packages) => {
        res.json(packages)
    }).catch((err) => {
        console.log(err)
    })
})

//delete part

router.route("/delete/:id").delete(async(req,res) => {
    let packageId = req.params.id;

    await userPackage.findByIdAndDelete(packageId).then(() => {
        res.status(200).send({status: "Order deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the order", error: err.message});
    })
})

//get details by an id

router.route("/get/:id").get(async(req,res) => {
    let packageId = req.params.id;
    const user = await userPackage.findById(packageId).then((Package) => {
        res.status(200).send({status: "Order fetched", Package})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get Order", error: err.message});
    })
})


export default router;