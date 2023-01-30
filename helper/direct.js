const vix = require('vix-api');
const { isUrl } = require('./url');

async function direct(url) {
  const domain = await isUrl(url);
  console.log(domain)
  switch(domain) {
    case 'anonfiles.com':
      return vix.anonfiles(url);;
      break;
    case 'bayfiles.com':
      return vix.bayfiles(url);
      break;
    case 'hxfile.co':
      return vix.hxfile(url);
      break;
    case 'mediafire.com':
      return vix.mediafire(url);
      break;
    case 'racaty.io' || 'racaty.net':
      return vix.racaty(url);
      break;
    case 'solidfiles.com':
      return vix.solidfiles(url);
      break;
    case 'zippyshare.com':
      return vix.zippyshare(url);
      break;
    default:
      return ({
        status: false,
        type: 'error',
        result: {
          message: 'No supported url'
        }
      });
  }
};

module.exports = { direct };