'use strict';
const express = require('express');
const app = express();
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIARJT2CDNMTETS5WX7',
  secretAccessKey: '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'
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'ever24',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname})
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  })
});

app.post('/upload', uploadS3.single('file'),(req, res) => {
  console.log(req.file);
});

app.listen(process.env.PORT || 3000);