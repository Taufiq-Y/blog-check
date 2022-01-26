import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url:'mongodb+srv://taufiq:taufiq123@blog-app.q49cd.mongodb.net/Blog-App?retryWrites=true&w=majority',
    options:{ useUnifiedTopology: true, useNewUrlParser: true},
    file: (req,file) => {
       const match = ["image/png", "image/jpg", "image/jpeg"];
       if(match.indexOf(file.memeType) === -1)
       return `${Date.now()}-blog-${file.originalname}`;

       return{
           bucketName: "photos",
           filename: `${Date.now()}-blog-${file.originalname}`
       }
    }
})

export default multer ({ storage });