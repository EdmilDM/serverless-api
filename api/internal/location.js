'use strict';

const response = require('../utils/generateResponseObject');
const bucketHelper = require('../utils/bucketHelper');
const calculator = require('../utils/distanceCalculator');

/* 
*  This implementation only works for up to 1000 files in the bucket
*  since listObjectsV2 only allows up to a maximun of 1000 files
*  per call in the getAllFiles() function. For more than 1000 files, it
*  would have to keep making requests until the isTruncated flag comes
*  as false while sending the last token on each subsequent call.
*/
module.exports.all = async () => {

    try {
        let values = await bucketHelper.getAllFiles();
        let contents = values.Contents;
        let filenames = [];
        for(let key in contents){
            filenames.push(contents[key].Key.split('.')[0]); // Split to remove the json file extension
        }
        return response.generateResponseObject(200, filenames);
    } catch (error) {
        return response.generateResponseObject(error.statusCode, error.message);
    }

};

module.exports.location = async (event) => {
    try{
        let value = await bucketHelper.getFile(event.queryStringParameters.filename);
        var parsedResponse = JSON.parse(value.Body.toString());

        // Add the distance to the office before sending it back as a response.
        parsedResponse.distanceToOffice = calculator.calculateDistance(parsedResponse.latitude, parsedResponse.longitude);
        return response.generateResponseObject(200, parsedResponse);
    } catch (error) {
        return response.generateResponseObject(error.statusCode, error.message);
    }
};

