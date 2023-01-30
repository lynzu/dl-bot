const fastFolderSizeSync = require('fast-folder-size/sync');

function convertBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes == 0) {
    return 'n/a'
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  if (i == 0) {
    return bytes + ' ' + sizes[i]
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

async function getTotalSize(folder) {
  const size = await fastFolderSizeSync(folder)
  return convertBytes(size)
}



module.exports = { getTotalSize };