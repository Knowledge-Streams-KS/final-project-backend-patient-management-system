import 'dotenv/config';
import express from 'express';
import { connectDB } from './db/config.js';
import syncDB from './db/init.js';
import AllRoutes from './Routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const myApp = express();
const port = process.env.PORT;



async function main() {
  await connectDB();
  console.log("DB is connected");
  await syncDB();
  console.log("DB is synced");
  myApp.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
}

main().catch((error) => {
  console.error(error);
});
