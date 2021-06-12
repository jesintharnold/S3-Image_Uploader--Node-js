
const path=require("path");
const fs=require("fs");
const AWS=require("aws-sdk");
const stream = require("stream");
const {request} = require("express");



const S3=new AWS.S3({
    accessKeyId:process.env.AccessKeyID,
    secretAccessKey:process.env.secretaccesskey
});

const commanAPI=async (req,res)=>{

    return res.send("It is working  -- proceed to /uploadimage");

}

const imageUploadAPI=async (req,res)=> {


    for(let i=0;i<req.currentUser.length;i++) {
        let stream = fs.createWriteStream(`Image-${i}.${(req.currentUser[i].filename.substr(-3)).toLowerCase()}`);

        stream.on('open', () => {
            req.currentUser[i].Image.pipe(stream);
        });

        stream.on('drain', () => {
            const written = (stream.bytesWritten);
            const total = parseInt( req.currentUser[i].Image.byteLength);
            const pWritten = (written / total * 100).toFixed(2)
            console.log(`Processing  ...  ${pWritten}% done`);
        });

        stream.on('close', () => {
            // Send a success response back to the client
            const msg = `Data uploaded -`;
            console.log(`Processing file - ${i} ...  100%`);

            if( req.currentUser.length===i+1){

                res.status(200).send(msg +req.currentUser.length+" files")
            }

        });

    }



    // const data=fs.createReadStream(req.currentUser.files[0].Image,{encoding:"binary"});
    // console.log(req.currentUser.files[0].Image);




    // console.log(req.currentUser.files[0]);

    // const  AwsUploads=()=>{
    //     const Key = "MERNDEV_1/8992.jpg";
    //     const Pass= new stream.PassThrough();
    //
    //     const params ={
    //         Key,
    //         Bucket: process.env.BucketName, //set somewhere
    //         Body: Pass, //req is a stream
    //     };
    //
    //     S3.upload(params, (err, data) => {
    //         if (err) {
    //             res.send('Error Uploading Data: ' + JSON.stringify(err) + '\n' + JSON.stringify(err.stack));
    //         } else {
    //             res.send(data);
    //         }
    //     });
    //
    //     return Pass;
    // }
    //
    // req.pipe(AwsUploads());

}

module.exports={
    commanAPI,
    imageUploadAPI
}