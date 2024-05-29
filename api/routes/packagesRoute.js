import express from 'express';
const router = express.Router();
import  Package from "../models/PackageModel.js";

//insert part

router.route("/add").post((req, res) => {
    const packageType = req.body.packageType;
    const packageName = req.body.packageName;
    const duration = req.body.duration;
    const price = Number(req.body.price);
    const description = req.body.description;

    const newPackage = new Package({
        packageType,
        packageName,
        duration,
        price,
        description
    })

    newPackage.save().then(() => {
        res.json("Package Added")
    }).catch((err) => {
        console.log(err);
    })
})

//read part

router.route("/").get((req,res) => {
    Package.find().then((packages) => {
        res.json(packages)
    }).catch((err) => {
        console.log(err)
    })
})

//update part

router.route("/update/:id").put(async(req,res) => {
    let packageId = req.params.id;
    const{packageType, packageName, duration,price, description} = req.body;

    const updatePackage = {
        packageType,
        packageName,
        duration,
        price,
        description
    }

    const update = await Package.findByIdAndUpdate(packageId,updatePackage).then(() => {
        res.status(200).send({status: "Package updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating package", error: err.message});
    })
})

//delete part

router.route("/delete/:id").delete(async(req,res) => {
    let packageId = req.params.id;

    await Package.findByIdAndDelete(packageId).then(() => {
        res.status(200).send({status: "Package deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the package", error: err.message});
    })
})

//get details by an id

router.route("/get/:id").get(async(req,res) => {
    let packageId = req.params.id;
    const user = await Package.findById(packageId).then((Package) => {
        res.status(200).send({status: "Package fetched", Package})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get package", error: err.message});
    })
})

export default router;
