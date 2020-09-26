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
  }
  type ApodRow {
    id: ID!
    title: String
    media_type: String
    url: String
    hdurl: String
    thumbnailUrl: String
    explanation: String
    copyright: String
  }
```