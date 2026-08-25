
import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Node 17+ / Windows DNS SRV lookup issues (querySrv ECONNREFUSED) with MongoDB Atlas
try {
    dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
    // Ignore error if DNS override is restricted
}

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('DB Connected')
        })
        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) { 
        throw error
    }
}

export default connectDB;