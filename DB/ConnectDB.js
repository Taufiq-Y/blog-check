import mongoose from 'mongoose';



const ConnectDB = async (URL) => {
    try {
    
    await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true,  });
    console.log('Database Connection Successful');
        } catch(error) {
            console.log('Error While Connecting to Mongo', error);
        }
    }

export default ConnectDB;