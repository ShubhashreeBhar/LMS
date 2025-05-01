import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

import mongoose from 'mongoose';

dotenv.config({});

// call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1000mb' })); 
app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}));
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
 

// app.listen(PORT, () => {
//     console.log(`Server listening at port ${PORT}`);
// });
app.listen(3000, () => console.log("Server running on port 3000"));
mongoose.connect('mongodb+srv://tulibhar7112004:zlCTwW8PZ5SqRd9A@lms.sfggeym.mongodb.net/?retryWrites=true&w=majority&appName=E-learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000  // 30 seconds timeout
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
