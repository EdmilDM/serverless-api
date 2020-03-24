# serverless-api

This API was made with Serverless framework and Node.js. Since the scope was so small, I felt that making a test suite would be overkill and just decided to test manually.

It has 3 endpoints, 2 which are GET and 1 POST.

* POST - https://g1dh89pre0.execute-api.us-east-2.amazonaws.com/dev/upload
* GET - https://g1dh89pre0.execute-api.us-east-2.amazonaws.com/dev/all-locations
* GET - https://g1dh89pre0.execute-api.us-east-2.amazonaws.com/dev/location

The first endpoint takes a JSON file body, and a Filename header must be provided with the filename. 

Example:

File upload:
![request1](https://user-images.githubusercontent.com/4473041/77372790-4a9a0400-6d45-11ea-9d4d-430124a7b284.PNG)
Header:
![request2](https://user-images.githubusercontent.com/4473041/77372811-5b4a7a00-6d45-11ea-92b0-bd6a4347bde1.PNG)
Valid json files:
```
{
  "latitude": 51.507351,
  "longitude": -0.127758
}
```
```
{
  "latitude": 59.507331,
  "longitude": 10.222355,
  "name": "ontario"
}
```
Invalid json files:
```
{
  "latitude": 51.507351,
  "name": "london"
}
```
```
{
  "latitude": 51.507351,
  "longitude: -900.000000
}
```
```
{
  "latitude": "new york city",
  "longitude: -900.000000
}
```

There are a couple of validations that the file must pass in order to store it in the S3 bucket:

* File and filename must not be empty.
* Filename must be .json extension.
* It must be a valid json file.
* It must have the mandatory fields latitude and longitude.
* Latitude must be -90 < latitude < 90 and longitude must be -180 < longitude < 80.

The second endpoint is a simple get request without parameters that returns a list of all file names without the .json extension.

The third endpoint is another get request, but this time it only looks for a single object with the specifed key in the parameters, the key name is filename.

Example:

![request3](https://user-images.githubusercontent.com/4473041/77373290-a1eca400-6d46-11ea-832b-d52e0d332803.PNG)

All the code is in the API folder, with 3 subfolders, one is for the external route, which is the upload one. External which is for both location requests, and utils for various utility methods I abstracted to help me.

To run yourself (with NPM):

1) Download project and navigate to it.

2) Install serverless cli globally.

```
npm install -g serverless
```

3) Configure serverless with AWS credentials, get your key and secret from your AWS account.

```
serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

4) Install dependencies.

```
npm i
```

5) Deploy with serverless.

```
serverless deploy
```

6) Alternatively, you can run locally with serverless-offline.

```
serverless offline start
```
