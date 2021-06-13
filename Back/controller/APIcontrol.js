const AWS=require("aws-sdk");
const stream = require("stream");
const fs = require("fs");
const {v4:uuidv4}=require('uuid');




const S3=new AWS.S3({
    accessKeyId:process.env.AccessKeyID,
    secretAccessKey:process.env.secretaccesskey
});

const commanAPI=async (req,res)=>{

    return res.send("It is working  -- proceed to /uploadimage");

}

const imageUploadAPI=async (req,res)=> {




    let random_name=uuidv4().toString()+req.currentUser[0].filename.substr(-4).toLowerCase().toString();

    const  AwsUploads=()=>{
        const Key = `MERNDEV_1/"+${random_name}`;
        const Pass= new stream.PassThrough();
        const params ={
            Key,
            Bucket: process.env.BucketName,    //set somewhere
            Body: Pass,       //req is a stream
        };

        S3.upload(params, (err, data) => {
            if (err) {
                res.status(400).send('Error Uploading Data: ' + JSON.stringify(err));
            } else {
                res.status(200).send(data);
            }
        });
        return Pass;
    }

    req.currentUser[0].Image.pipe(AwsUploads());

}

module.exports={
    commanAPI,
    imageUploadAPI
}