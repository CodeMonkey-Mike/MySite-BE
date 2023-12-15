# mikeneder service

## Tech Stack

Development:
- [x] [KOA](https://github.com/koajs/koa)
- [x] [Kors](https://github.com/koajs/cors)
- [x] [Apollo Server](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-koa)
- [x] [Type-Graphql](https://github.com/MichalLytek/type-graphql)
- [x] [TypeORM](https://github.com/typeorm/typeorm) 
- [x] [Dotenv](https://github.com/motdotla/dotenv)

Database: 
- [x] [PostgresQL](https://www.postgresql.org/)
## Set up


### Prerequisites

* [Install Node](https://nodejs.org/en/download/)
* [Install Postgresql](https://www.postgresql.org/download/)

Make sure that you have Node.js and npm and postgres installed.

Create `.env` and copy `.env.example`, change with the postgres configuration.
### Install

```
$ git clone git@github.com:CodeMonkey-Mike/mikeneder-be.git
$ cd mikeneder-be
$ yarn
```

### Run
By run the command below, the site will start at `localhost:4000/graphql`.

```
$ yarn dev
```
### Automation

##### 1.  When creating a new PR, the new build will execute for that PR, then create a new domain for it.

```
http://api-stage.mikeneder.me/graphql
```

##### 2.  When code is merged to master, will update the staging site automatically
- After code reviewed, use `Squash and merge` at the bottom of pull request page. The pipeline will run after all checks passed the site will update.
```
http://api-staging.mikeneder.me/graphql
```

##### 3. After staging tested and passed. Create a tag and push to git, will update the production site automatically.

Command line:
- This action will run release script automatically which is pull a latest commit and collecting the message then increase previous version to new version.

```
$ yarn release -auto
```
The format of release tag:
```
vX.X.X
```
E.g v0.1.0

Produciton url:
```
https://api.mikeneder.me/graphql
```
