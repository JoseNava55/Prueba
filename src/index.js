import app from "./app";
import './databse';
import {PORT} from './config';

app.listen(PORT);
console.log("SERVIDOR EN PUERTO", PORT);
