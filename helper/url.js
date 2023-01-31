async function isUrl(url){
  let result = null
  try {
    result = url.match(/^(?:.*\:\/?\/)?(?<domain>[\w\-\.]*)/i).groups.domain
      .match(/(?<root>[\w\-]*(\.\w{3,}|\.\w{2}|\.\w{2}\.\w{2}))$/).groups.root;
  } catch(ignore) {}
  return result;
}

module.exports = { isUrl };