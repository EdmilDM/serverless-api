const generateResponseObject = (status, message) => {
    return {
        statusCode: status,
        body: JSON.stringify(
          {
            message: message,
          },
          null,
          2
        ),
      };
};

module.exports = {
    generateResponseObject: generateResponseObject,
};
