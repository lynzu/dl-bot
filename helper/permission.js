async function perm(id) {
  const permList = (process.env.PERM).split(',');
  if (permList.includes(id) == true ) {
    return (true)
  } else {
    return (false)
  }
};

module.exports = { perm };