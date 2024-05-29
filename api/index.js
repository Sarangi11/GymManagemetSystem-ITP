import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import UserRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import itemsRoutes from './routes/items.route.js';
import employe from './routes/employe.route.js';
import cors from 'cors';
import bodyParser from 'body-parser'; 



import  ScheduleRoute from "./routes/schedulesRoute.js";
import AppoinmentRouter from "./routes/AppoinmentRoutes.js";
import maintenanceRouter from"./routes/Maintenanceroutes.js";
import maintenance1Router from "./routes/Maintnance1routes.js";
import packageRouter from"./routes/packagesRoute.js";
import proPackageRouter from "./routes/proPackageRoute.js";
import userPackage from "./routes/userPkgRoute.js";
import  userProPackage from "./routes/userProPkgRoute.js";
import  workoutrouter from "./routes/WorkoutPlans.js";
import  Twodayworkoutrouter  from "./routes/Twodayworkoutroute.js";
import Threedayworkoutrouter from "./routes/Threedayworkoutroute.js";
import  ScheduleCRoute from "./routes/ScheduleCRoute.js";

import ReportRoute from "./routes/TrainerReportRoutes.js";

import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('is commd');
})
.catch((err) => {
    console.log(err);
})
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port ');
})


app.use("/TrainerSchedule", ScheduleRoute );

app.use("/appointment", AppoinmentRouter );

app.use("/maintenance" , maintenanceRouter );

app.use("/maintenance1" , maintenance1Router );

app.use("/package", packageRouter);

app.use("/proPackage", proPackageRouter);

app.use("/userPkg", userPackage);

app.use("/userProPkg", userProPackage);

app.use("/workoutplan",workoutrouter);

app.use("/Twodayworkoutplan",Twodayworkoutrouter);

app.use("/Threedayworkoutplan",Threedayworkoutrouter);

app.use("/shedulech",ScheduleCRoute);

app.use("/Report",ReportRoute);


app.use('/api/user', UserRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/employe', employe);




app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
 