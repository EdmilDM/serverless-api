const messages = require('./messages');

// All the required properties as per the bullet point.
const propertyList = ['latitude', 'longitude'];
const LATITUDE_LOWER_LIMIT = -90;
const LATITUDE_UPPER_LIMIT = 90;
const LONGITUDE_LOWER_LIMIT = -180;
const LONGITUDE_UPPER_LIMIT = 80;

const validateInput = (file, filename) => {
    try{
        validateFile(file);
        validateFilename(filename);
        validateIsJSON(file);
        validateHasRequiredFields(file);
        ValidateLatAndLong(file);
    } catch(error){
        throw error;
    }
    
};

const validateFile = (file) => {
    if(!file){
        throw new Error(messages.UPLOAD_ERRORS.FILE_MISSING);
    }
}

const validateFilename = (filename) => {
    if(!filename){
        throw new Error(messages.UPLOAD_ERRORS.FILENAME_MISSING);
    }
    if (!filename.match(".json$", "i")) {
        throw new Error(messages.UPLOAD_ERRORS.FILENAME_NOT_JSON);
    }
}

const validateIsJSON = (file) => {
    // If it is not a JSON file, JSON.parse will return an error.
    try {
        JSON.parse(file);
      } catch(error) {
        throw new Error(messages.UPLOAD_ERRORS.INVALID_TYPE);
      }
};

const validateHasRequiredFields = (file) => {
    const parsedFile = JSON.parse(file);
    for(const i in propertyList){
        if(!parsedFile.hasOwnProperty(propertyList[i])){
            throw new Error(messages.UPLOAD_ERRORS.REQUIRED_ATTRIBUTES);
        }
    }
};

const ValidateLatAndLong = (file) => {
    const {latitude, longitude} = JSON.parse(file);
    if(!parseFloat(latitude) || !parseFloat(longitude)){
        throw new Error(messages.UPLOAD_ERRORS.INVALID_VALUE);
    }
    if(latitude < LATITUDE_LOWER_LIMIT || latitude > LATITUDE_UPPER_LIMIT){
        throw new Error(messages.UPLOAD_ERRORS.LATITUDE_OUT_OF_BOUNDS);
    }
    if(longitude < LONGITUDE_LOWER_LIMIT || longitude > LONGITUDE_UPPER_LIMIT){
        throw new Error(messages.UPLOAD_ERRORS.LONGITUDE_OUT_OF_BOUNDS);
    }
};

module.exports = {
    validateInput: validateInput,

};
