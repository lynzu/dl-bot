const Downloader = require('nodejs-file-downloader');

async function dl(url, name) {
  return new Promise(async(resolve, reject) => {
    const downloader = new Downloader({
      url: url,
      directory: 'dl',
      fileName: name,
      cloneFiles: false,
      onProgress: function (percentage) {
        process.stdout.write(`Downloadeding ${percentage}%\r`);
      }
    });
    await downloader.download();
    resolve();
  });
};

module.exports = { dl };