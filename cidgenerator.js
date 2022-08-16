require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const { fileLoader } = require('ejs');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./uploads/' + file.filename);


const options = {
  pinataMetadata: {
      name: 'test',
      keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2'
      }
  },
  pinataOptions: {
      cidVersion: 1
  }
};

pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
  //handle results here
  console.log(result.IpfsHash);
}).catch((err) => {
  //handle error here
  console.log(err);
});

// pinata.testAuthentication().then((result) => {
//   //handle successful authentication here
//   console.log(result);
// }).catch((err) => {
//   //handle error here
//   console.log(err);
// });





// var axios = require('axios');
// var FormData = require('form-data');
// var fs = require('fs');
// var data = new FormData();
// data.append('file', fs.createReadStream('/public/images/teste.jpg'));
// data.append('pinataOptions', '{"cidVersion": 1}');
// data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');

// var config = {
//   method: 'post',
//   url: 'https://api.pinata.cloud/data/testAuthentication',
//   headers: { 
//     'Authorization': 'Bearer ' + process.env.PINATA_JWT, 
//     ...data.getHeaders()
//   },
//   data : data
// };

// const res = async () => { await axios(config);}

// console.log(res.data);


  // var formFile = new FormData();
  // formFile.append('uploadfile', buffer, { filename: filename, filepath: path, contentType: mimetype, knownLength: size });
  