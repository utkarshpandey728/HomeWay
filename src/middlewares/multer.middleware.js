import multer from 'multer';


//by this way we can store the file in local storage and then we can upload it to
//  cloudinary and then we can delete the file from local storage after uploading it to cloudinary
const storage =multer.diskStorage({  
    destination: function(req,file,cb){
        cb(null,"./public/temp")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({storage})