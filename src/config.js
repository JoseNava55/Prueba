import {config} from 'dotenv';
config();

//console.log();
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/crud"
export  const PORT = process.env.PORT || 3000;
