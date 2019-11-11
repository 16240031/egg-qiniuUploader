'use strict';

/**
 * egg-qiniu default config
 * @member Config#qiniuUploader
 * @property {String} SOME_KEY - some description
 */
const qiniu = require('qiniu');

exports.qiniuConfig = {
  accessKey: '',
  secretKey: '',
  bucket: 'zykj',
  expires: 3600,
};
