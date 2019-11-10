'use strict';

/**
 * egg-qiniu default config
 * @member Config#qiniu
 * @property {String} SOME_KEY - some description
 */
const qiniu = require('qiniu');

exports.qiniuConfig = {
  accessKey: '',
  secretKey: '',
  bucket: 'zykj',
  zone: qiniu.zone.Zone_z2,
  useHttpsDomain: true,
  useCdnDomain: true,
};
