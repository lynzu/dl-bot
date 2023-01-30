function isUrl(url) {
  var result;
  var match;
  if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
    result = match[1];
    if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
      result = match[1];
    }
 }
 return result;
};

module.exports = { isUrl };