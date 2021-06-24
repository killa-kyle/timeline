require("dotenv").config()

// SETTINGS
var AWS_KEY = process.env.AWS_KEY
var AWS_SECRET = process.env.AWS_SECRET
var BUCKET = 'krose-files-19';
var PREFIX = '';

var async = require('async');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: 'us-west-2'
});

var s3 = new AWS.S3();

var params = {
	Bucket: BUCKET,
	Prefix: PREFIX
}

async function getImages(){
//   const data = await s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log("Error", err);
//       return err
//     } else {
//       console.log("Success", data.Buckets);
//       return data.Buckets
//     }
//   });

    const data = await s3.listObjects(params, function(err, data){
        if (err) return console.log(err);
        console.log(data.Contents);
        return data.Contents
        // async.eachSeries(data.Contents, function(fileObj, callback){
        // 	var key = fileObj.Key;
        // 	console.log('Downloading: ' + key);

        // 	var fileParams = {
        // 		Bucket: BUCKET,
        // 		Key: key
        // 	}

        // 	s3.getObject(fileParams, function(err, fileContents){
        // 		if (err) {
        // 			callback(err);
        // 		} else {
        // 			// Read the file
        // 			var contents = fileContents.Body.toString();

        // 			// Do something with file

        // 			callback();
        // 		}
        // 	});
        // }, function(err) {
        // 	if (err) {
        // 		console.log('Failed: ' + err);
        // 	} else {
        // 		console.log('Finished');
        // 	}
        // });
    });
  return data;
}

(async () => {
    console.log('getImages');
    let awsResults = await getImages()
    console.log('aws returned')
    console.log(awsResults);
})()

