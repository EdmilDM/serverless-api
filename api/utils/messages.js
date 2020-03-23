const UPLOAD_ERRORS = {
    'FILENAME_MISSING': 'Filename header must be provided.',
    'FILENAME_NOT_JSON': 'Filename must have json extension.',
    'FILE_MISSING': 'File must be provided.',
    'INVALID_TYPE': 'File is not of type json or is not a valid json file.',
    'REQUIRED_ATTRIBUTES': 'File is missing required attributes latitude/longitude.',
    'INVALID_VALUE': 'Latitude and/or longitude have invalid values.',
    'LATITUDE_OUT_OF_BOUNDS': 'Latitude must be between -90 and 90.',
    'LONGITUDE_OUT_OF_BOUNDS': 'Longitude must be between -180 and 80.',

};

const UPLOAD_MESSAGE = {
    'SUCCESS' : 'File uploaded successfully.',

}

module.exports = {
    UPLOAD_ERRORS,
    UPLOAD_MESSAGE,

};
