import 'dotenv/config';
import express from 'express'
import { connectDB } from './db/config.js';
import syncDB from './db/init.js';
import AllRoutes from './Routes/index.js';
//import bodyParser from 'body-parser';
import cors from "cors"
const myApp = express();
const port = process.env.PORT

myApp.use(express.json())
//myApp.use(bodyParser.urlencoded({ extended: true }));

myApp.use(cors({
   origin  : "http://localhost:5173",
  // methods : "POST"
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))
// Enable CORS
// myApp.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   credentials: true,
//   allowedHeaders: 'Content-Type'
// }));
//you must enable cors before routing or u'll face CORS errors!



myApp.use(AllRoutes);


async function main() {
  await connectDB();
  console.log("DB is connected")
  await syncDB();
  console.log("DB is synced")
  myApp.listen(port,()=> {
    console.log(`server is running at port ${port}`)
  })
}

main().catch((error) => {
  console.error(error);
});