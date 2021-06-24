require('dotenv/config');
const express = require('express');
const fs = require("fs")
const screenshotsFolder = "./api/screenshots/2020"

const app = express();
app.use('/images',express.static("./api/screenshots/2020"))

 
app.get('/', (req, res) => {
  return res.json(JSON.stringify(createFileUrls()))
});
 
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);



function createFileUrls(){
  let screenshots = []
  fs.readdirSync(screenshotsFolder).forEach((file) => {    
    screenshots = [...screenshots, `http://localhost:${process.env.PORT}/images/${file}`]
  })
  
  return screenshots
}


