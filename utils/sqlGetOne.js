const sqlGetter = require('./sqlGetter');

async function sqlGetOne (sql) {
  const result = await sqlGetter(sql);
  return result;
}

module.exports = sqlGetOne;