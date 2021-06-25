import 'dotenv/config';
import express from 'express'

import path from "path"
import { getImageUrls } from './aws-service.js';


const port = process.env.PORT || 5000 
const app = express();


const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

// console.log(`pathname ${moduleURL.pathname}`);
// console.log(`dirname ${path.dirname(moduleURL.pathname)}`);




app.get('/images', async (req, res) => {
  let imageUrls = await getImageUrls();
  return res.json(JSON.stringify(imageUrls))
});
 
// app.post('/', (req, res) => {
//   return res.send('Received a POST HTTP method');
// });
 
// app.put('/', (req, res) => {
//   return res.send('Received a PUT HTTP method');
// });
 
// app.delete('/', (req, res) => {
//   return res.send('Received a DELETE HTTP method');
// });
 

app.use(express.static(path.join(__dirname, '/frontend/', 'build') ));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"))
})


app.listen(port, () =>
  console.log(`timeline api listening on port ${port}!`),
);

