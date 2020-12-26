const mySqlDatabaseName = process.env.MYSQL_DATABASE;
const mySqlTableName = process.env.MYSQL_TABLE;

const createTable = `CREATE TABLE IF NOT EXISTS ${mySqlTableName} (
  id SMALLINT NOT NULL AUTO_INCREMENT,
  date date,
  title varchar(128),
  media_type varchar(64),
  url varchar(255),
  hdurl varchar(255),
  explanation longtext CHARACTER SET utf8mb4,
  copyright varchar(64),
  thumbnailUrl VARCHAR(255),
  PRIMARY KEY (id)
);`

const checkForDatabase = `SHOW DATABASES LIKE '${mySqlDatabaseName}'`
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${mySqlDatabaseName}`
const checkForTable = `SHOW TABLES LIKE '${mySqlTableName}'`;
const useDatabase = `USE ${mySqlDatabaseName}`
const getLatestRecord = `SELECT DATE_FORMAT(date,\'%Y-%m-%d\') date from ${mySqlTableName} ORDER by id DESC LIMIT 1`;
const noop = `SELECT * from ${mySqlTableName} WHERE false`;
// the date object needs formatting to be ISO, otherwise it gets converted to epoch.
const formattedSelectStar = `SELECT id, DATE_FORMAT(date,\'%Y-%m-%d\') date, title, media_type, url, ` +
  `hdurl, thumbnailUrl, explanation, copyright from ${mySqlTableName}`
const getRecordById = function (id) {
  return `${formattedSelectStar} WHERE id = ${id}`;
}
const getRecordByIsoDate = function (isoDate) {
  return `${formattedSelectStar} WHERE date = '${isoDate}';`;
}

const getRecordsByDateRange = function (beginDate, endDate, descending = false) {
  return `${formattedSelectStar} WHERE date BETWEEN '${beginDate}' AND '${endDate}' ` + 
    `ORDER BY date${descending ? ' DESC' : ''};`;
}

const getRecordsByYearMonth = function (year, month, descending = false) {
  month++;
  month = month < 10 ? `0${month}` : month;
  const result = `${formattedSelectStar} WHERE date LIKE '${year}-${month}%' ` +
    `ORDER BY date${descending ? ' DESC' : ''};`;
  return result;
}

const getRecordsByYear = function (year, descending = false) {
  const result = `${formattedSelectStar} WHERE date LIKE '${year}-%' ` +
    `ORDER BY date${descending ? ' DESC' : ''};`;
  return result;
}

const searchRecords = function (term, number = 10, offset = 0) {
  return `${formattedSelectStar} WHERE title LIKE '%${term}%' OR explanation LIKE '%${term}%' LIMIT ${offset}, ${number};`;
}

const getRecords = function (number = 10, offset = 0) {
  return `${formattedSelectStar} ORDER BY date DESC LIMIT ${number} OFFSET ${offset};`;
}

const insertNewApodRecord = function (con, record) {
  try {
    const sql = `INSERT INTO ${mySqlTableName} (date, title, media_type, url, hdurl, explanation, copyright) ` +
    `VALUES (` +
    `  ${con.escape(record.date)},` +
    `  ${con.escape(record.title && record.title)},` +
    `  ${con.escape(record.media_type && record.media_type)},` +
    `  ${con.escape(record.url && record.url)},` +
    `  ${con.escape(record.hdurl && record.hdurl)},` +
    `  ${con.escape(record.explanation && record.explanation.substr(0, 2047))},` +
    `  ${con.escape(record.copyright && record.copyright.substr(0, 63))})`;
    return sql;
  } catch(e) {
    console.error('scrapeApod; insert query error');
    return noop;
  }
}

const recentImageWithoutThumbnails = `SELECT id, url ` +
  `FROM ApodApiRecords ` + 
  `WHERE thumbnailUrl IS NULL ` +
  `AND media_type = 'image' ` +
  `ORDER BY id DESC ` + 
  `LIMIT 1;`

function updateThumbnail (id, path) {
  return `UPDATE ${mySqlTableName} SET thumbnailUrl = '${path}' WHERE id = ${id}`;
}

module.exports = {
  checkForDatabase,
  checkForTable,
  createTable,
  createDatabase,
  getLatestRecord,
  getRecords,
  getRecordById,
  getRecordByIsoDate,
  getRecordsByDateRange,
  getRecordsByYear,
  getRecordsByYearMonth,
  insertNewApodRecord,
  noop,
  recentImageWithoutThumbnails,
  searchRecords,
  updateThumbnail,
  useDatabase,
};