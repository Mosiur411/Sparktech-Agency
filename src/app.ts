import express, { Request, Response } from 'express'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFound'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './route/route'


const app = express()
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173','https://epiccoder.hac.soukhin.shop'] }));


// middleware
app.use(express.json())

app.use('/api/v1', router);
const getAcontroller = (req :Request, res:Response) =>{
  res.send('Welcome')
}

app.get('/', getAcontroller);


app.use(globalErrorHandler)
app.use(notFound)



export default app
