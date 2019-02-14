# Aula Internet Radio #

The Aula Internet Radio project has one goal: be the best Internet radio station in the entire world!

## Application Structure and Considerations ##

- src
    - client
    - server
        - config > Application-wide configuration
        - controllers > Sources responsible for the composition of many service calls
        - models > Data models
        - routes > Sources responsible for directing traffic to the appropriate destination
        - views > HTML sources which will eventually be used in conjunction with the client-side bundle



## Development ##

Spin things up manually for dev and testing. Note that when you remove these
containers, the datastore will be wiped out.

```
docker network create aula-radio
docker run -it --rm --name aula-mongo \
	--network aula-radio \
	--network-alias db \
    -p 27017:27017 \
    mongo
docker run -it --rm --name aula-radio \
    -v $PWD:/usr/src/app \
    -w /usr/src/app \
    -p 3000:3000 \
    --network aula-radio \
    node:8-alpine \
    sh
docker network connect bridge aula-mongo
docker network connect bridge aula-radio
```

Spin up everything you need:
```
docker-compose up
```

## Environment Variables ##

Optional:
* *PORT*: The port the application listens on for connections
* *SECRET*: The secret used when generating session ids
* *DB_URI*: The URI by which the datastore may be found
* *DB_USER*: The username for the database connection
* *DB_PASS*: The password for the database connection
* *TLS_KEY_PATH*: The path to the tls key file
* *TLS_CERT_PATH*: The path to the tls certificate file

## Considerations ##

What follows are the assumptions and considerations made during development, as well as some considerations that may be made in the future.

### Future Considerations ###

- Application performance can improve by caching network results
- Over 700TB of data is exposed by insecure Mongo installations. In order to not be added to that statistic, we would need to lock down our install
- Naturally, TLS is a must
- Federated authentication through Facebook, Google, LinkedIn, etc. Passport will make this pretty simple
- We're storing binary data in MongoDB, which has a max BSON size limit of 16mb.
    - I wanted to get auth and naive cache invalidation working, and this came at the expense of filesystem-based storage due to time constraints.
    - Mongo doesn't support streaming binary data, so we're grabbing the entirety of a file in one chunk. GridFS would be a reasonably alternative
- GraphQL integration

### Bonuses ###

- [ ] Frontend uses Redux
- [ ] Songs are stored/retrieved from some network storage (dropbox, drive, s3)
- [ ] Metadata could be fetched from some external API instead of being statically stored in a JSON file.
- [ ] Usage of websockets in order to implement some live information on what other users are listening (you are free to display that however you prefer).
- [x] Authentication