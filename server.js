import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import DotEnv from 'dotenv'

//Components Import
import Router from './routes/route.js';
import ConnectDB from './DB/ConnectDB.js';

const app = express();
DotEnv.config();

app.use(cors())
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', Router);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and listening to Port ${PORT}`));

const URL = 'mongodb+srv://taufiq:taufiq123@blog-app.q49cd.mongodb.net/Blog-App?retryWrites=true&w=majority'

ConnectDB(process.env.MONGODB_URI || URL);