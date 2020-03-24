const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const BUCKET_NAME = 'take-home-bucket';

const uploadFile = async (file, filename) => {
    return S3.putObject({Bucket : BUCKET_NAME, Key: filename, Body: file}).promise();
};

const getAllFiles = async () => {
    return S3.listObjectsV2({Bucket: BUCKET_NAME}).promise();
};

const getFile = async (filename) => {
    return S3.getObject({Bucket: BUCKET_NAME, Key: filename}).promise();
}

module.exports = {
    uploadFile: uploadFile,
    getAllFiles: getAllFiles,
    getFile: getFile,
    
};
