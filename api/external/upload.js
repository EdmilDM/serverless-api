'use strict';

const message = require('../utils/messages').UPLOAD_MESSAGE;
const validator = require('../utils/validateUpload');
const response = require('../utils/generateResponseObject');
const bucketHelper = require('../utils/bucketHelper');

module.exports.upload = async event => {

    let file = event.body;
    const filename = event.headers.Filename;

    try {
        validator.validateInput(file, filename);
    } catch (error) {
        return response.generateResponseObject(400, error.message);
    }

    try{
        const res = await bucketHelper.uploadFile(file, filename);
        return response.generateResponseObject(200, message.SUCCESS);
    } catch (error) {
        return response.generateResponseObject(error.statusCode, error.message);
    }

};
