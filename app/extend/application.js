'use strict';
const qiniu = require('qiniu');
module.exports = {
  createUploadToken(opt) {
    const { config } = this;
    const accessKey = opt.accessKey || config.qiniuConfig.accessKey;
    const secretKey = opt.secretKey || config.qiniuConfig.secretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const uploadStrategy = {
      scope: opt.bucket || config.qiniuConfig.bucket,
      isPrefixalScope: 1,
      expires: config.qiniuConfig.expires,
      insertOnly: 1,
      returnBody: JSON.stringify({
        key: '$(key)',
        name: '$(fname)',
        size: '$(fsize)',
        type: '$(mimeType)',
        bucket: '$(bucket)',
        w: '$(imageInfo.width)',
        h: '$(imageInfo.height)',
      }),
    };
    const putPolicy = new qiniu.rs.PutPolicy(uploadStrategy);
    return putPolicy.uploadToken(mac);
  },

  createFormUploader(zone, useHttpsDomain, useCdnDomain) {
    const $config = new qiniu.conf.Config();
    // 空间对应的机房
    $config.zone = zone;
    // 是否使用https域名
    $config.useHttpsDomain = useHttpsDomain;
    // 上传是否使用cdn加速
    $config.useCdnDomain = useCdnDomain;

    const formUploader = new qiniu.form_up.FormUploader($config);

    return formUploader;
  },

  // 文件上传
  uploadPutFile(localFile, fileName, uploadToken, formUploader) {
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, fileName, localFile, putExtra, (respErr, resBody) => {
        if (respErr) {
          reject(respErr);
        } else {
          resolve(resBody);
        }
      });
    });
  },

  // 数据流上传
  uploadPutStream(readableStream, fileName, uploadToken, formUploader) {
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((resolve, reject) => {
      formUploader.putStream(uploadToken, fileName, readableStream, putExtra, (respErr, resBody) => {
        if (respErr) {
          reject(respErr);
        } else {
          resolve(resBody);
        }
      });
    });
  },
};
