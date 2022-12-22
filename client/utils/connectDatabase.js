import mongoose from 'mongoose';

console.log(process.env.MONGO_URI);
const connectDatabase = async () => mongoose.connect(process.env.MONGO_URI);

export default connectDatabase;
