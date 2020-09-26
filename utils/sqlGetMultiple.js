const sqlGetter = require('./sqlGetter');

async function sqlGetMultiple (sql) {
  const result = await sqlGetter (sql, true);
  return result;
}

module.exports = sqlGetMultiple;