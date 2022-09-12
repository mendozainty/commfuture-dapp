require('dotenv').config({ path: '../.env'});
const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const fs = require('fs');
const { User, Contract } = require('../middleware/db');


router.use(bodyParser.urlencoded({extended:true}));



router.post('/', upload.single('uploadfile'), (req, res, next) =>  {
  
  const sourcePath = './uploads/' + req.file.filename
  console.log(req.file);
  const options = {
    pinataMetadata: {
        name: req.file.originalname,
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 1
    }
  };
  
  pinata.pinFromFS(sourcePath, options).then((result) => {
    //handle results here
    console.log(result);
  }).catch((err) => {
    //handle error here
    console.log(err);
  });
  
  
});
 


module.exports = router;



 