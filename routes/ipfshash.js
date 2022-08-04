require('dotenv').config({ path: '../.env'});
const router = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
// var axios = require('axios');
var FormData = require('form-data');
// const formidable = require('formidable');


router.use(bodyParser.urlencoded({extended:true}));



router.post('/', upload.single('uploadfile'), (req, res, next) =>  {
  
  const { headers, file } = req;
  const { buffer, originalname, path, mimetype, size , filename} = file;
  console.log(file.mimetype);
  
  var formFile = new FormData();
  formFile.append('uploadfile', buffer, { filename: filename, filepath: path, contentType: mimetype, knownLength: size });
  
  // headers['Content-Type'] = 'multipart/form-data';
  // headers['Authorization'] = `Bearer ${process.env.PINATA_JWT}`
  // const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  // doPOST(url, formFile, {}, headers)
  //   .catch((error) => {
  //     const { status, data } = error.response;
  //     res.status(status).send(data);
  //   })
  //   .then(({ data }) => {
  //     res.send(data);
  //   });
});
 


module.exports = router;
