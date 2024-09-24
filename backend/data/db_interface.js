import env from 'dotenv';
import mongoose from 'mongoose';

env.config();
const mongo_uri = process.env.MONGO_URI || '';

export const dbConnect = async () => {
  try {
    var db = await mongoose.connect(mongo_uri);
    console.log(`Connected to ${db.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
