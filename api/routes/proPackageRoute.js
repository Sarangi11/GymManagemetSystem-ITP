import express from 'express';
const router = express.Router();
import proPackage from "../models/proPackageModel.js";

//insert part

router.route("/add").post((req, res) => {
    const packageType = req.body.packageType;
    const proPackageName = req.body.proPackageName;
    const proPrice = Number(req.body.proPrice);
    const proDuration = req.body.proDuration;
    const reason = req.body.reason;

    const newPackage = new proPackage({
        packageType,
        proPackageName,
        proPrice,
        proDuration,
        reason
    })

    newPackage.save().then(() => {
        res.json("Package Added")
    }).catch((err) => {
        console.log(err);
    })
})

//read part

router.route("/").get((req,res) => {
    proPackage.find().then((packages) => {
        res.json(packages)
    }).catch((err) => {
        console.log(err)
    })
})

//update part

router.route("/update/:id").put(async(req,res) => {
    let packageId = req.params.id;
    const{packageType, proPackageName, proPrice, proDuration, reason} = req.body;

    const updatePackage = {
        packageType,
        proPackageName,
        proPrice,
        proDuration,
        reason
    }

    const update = await proPackage.findByIdAndUpdate(packageId,updatePackage).then(() => {
        res.status(200).send({status: "Package updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating package", error: err.message});
    })
})

//delete part

router.route("/delete/:id").delete(async(req,res) => {
    let packageId = req.params.id;

    await proPackage.findByIdAndDelete(packageId).then(() => {
        res.status(200).send({status: "Package deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the package", error: err.message});
    })
})

//get details by an id

router.route("/get/:id").get(async(req,res) => {
    let packageId = req.params.id;
    const user = await proPackage.findById(packageId).then((Package) => {
        res.status(200).send({status: "Package fetched", Package})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get package", error: err.message});
    })
})

export default router;
