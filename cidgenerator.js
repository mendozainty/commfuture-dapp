require('dotenv').config();
const https = require("https");

const options = {
  host: 'ipfs.infura.io',
  port: 5001,
  path: '/api/v0/pin/add?pin=true',
  method: 'POST',
  auth: process.env.PROJECT_ID_IPFS + ':' + process.env.PROJECT_SECRET_IPFS,
  file: '/'        
}   

https.request(options, (res) => {
  
  console.log(req.headers);
  
  res.on('data', function (data) {
      console.log(data);
  });
  res.on('end', function (hash) {
      console.log(hash);
  });
});
// req.end(); 

// const infuraPin = async () => {     
  
// }

// infuraPin().catch(e=>console.error(e));


//   node cidgenerator.js
