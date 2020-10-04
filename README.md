# APOD GRAPHQL
Since 1995 [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html) has almost daily brought the wonder of the cosmos to the public with beautiful imagery and expert written explanations of what you are seeing. They have been offering more videos, and higher resoution pictures as the Web has matured over the last decades.

## Intent
- Wrap APOD history in my MySQL database via GraphQL.  I'm not hitting the GET https://api.nasa.gov/planetary/apod API here.  I do a daily scrape of the current APOD with another project.  That's only a few hits a day of their API, one to get the metadata, another to get the image for making a thumbnail of it.  I also downloaded the images to my project folders statically, to further reduce the load on the public API's in support of my project.
- Allow pagination of the APOD data any way I see fit.
- Support a multi-platform web / mobile / ott app to explore, this amazing public resource even on hardware-restricted environments (ott) and Raspberry Pi.

## Schema
```
  type Query {
    getRecordById(id: ID): ApodRow,
    getRecordByIsoDate(date: String): ApodRow,
    getRecordsByDateRange(beginDate: String, endDate: String, descending: Boolean): [ApodRow],
    getRecordsByYearMonth(year: Int, month: Int, descending: Boolean): [ApodRow],
    getRecordsByYear(year: Int, descending: Boolean): [ApodRow],
    getRecordsPaginatedByMonth(year: Int, month: Int, limit: Int): [Month],
    searchRecords(term: String, number: Int, offset: Int): [ApodRow],
  }
  type ApodRow {
    id: ID!
    date: String
    title: String
    media_type: String
    url: String
    hdurl: String
    thumbnailUrl: String
    explanation: String
    copyright: String
  }
  type Month {
    year: Int,
    month: Int,
    days: [ApodRow]
  }
  type Error {
    code: String
    message: String
    token: String
  }
```

## .env
You'll need your own values to connect to your MySql Instance, but here's an example .env file:
```
NASA_API_KEY=DEMO_KEY
NASA_API_ACCOUNT_ID=1a2b3cd-1a2b-1a2b-1a2b-1a2b3cd1a2b3cd
MYSQL_ENDPOINT=localhost
MYSQL_DATABASE=MyApodDatabase
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_TABLE=ApiRecords
```