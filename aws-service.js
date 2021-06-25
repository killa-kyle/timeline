import 'dotenv/config';
import fs from 'fs'
import AWS from 'aws-sdk'
// SETTINGS
var AWS_KEY = process.env.AWS_KEY
var AWS_SECRET = process.env.AWS_SECRET
var AWS_REGION = 'us-west-2'
var BUCKET = 'krose-files-19';
var PREFIX = '';


AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION
});

var s3 = new AWS.S3();

var params = {
	Bucket: BUCKET,
	Prefix: PREFIX
}
var s3url = `https://${BUCKET}.s3.${AWS_REGION}.amazonaws.com`
async function getImages(){
    console.log(s3url, AWS_KEY.length)
    const data = await s3.listObjects(params).promise();
    const images = data.Contents
  return images || data;
}

export const getImageUrls = (async () => {
    let awsResults = await getImages()
    let imageUrls = awsResults.map(result => `${s3url}/${result.Key}`);

    return imageUrls
})

