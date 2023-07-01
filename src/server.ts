import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import userRoutes from './routes/user';
import tagRoutes from './routes/tag';
import questionRoutes from './routes/question';
import answerRoutes from './routes/answer'
import sequelize from './config/config';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use('/api/v1', userRoutes);
app.use('/api/v1', tagRoutes);
app.use('/api/v1', questionRoutes);
app.use('/api/v1', answerRoutes);

sequelize.authenticate().then(()=> {
    console.log('Connection has been established successfully.');
}).then(()=>{ 
    app.listen(PORT, ()=> {
        console.log(`Server listening on ${PORT}`);
    })
}).catch((err)=>{
    console.log(err.message)
  })