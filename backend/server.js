import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'

// App Config
const app = express()
const port = process.env.PORT || 4000


// // CORS configuration
// const corsOptions = {
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin) || !origin) {
//         // Allow requests from the frontend or if there's no origin (e.g., from Postman)
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
//   };

// middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
    res.send("API WORKING")
})


app.listen(port, () => {
    console.log("Server is running at PORT : " + port);
    connectDB();
    connectCloudinary();
})