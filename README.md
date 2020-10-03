# YDR user Service
All de the online users in the world

(Docker image repo)https://hub.docker.com/repository/docker/belce/ydr-user-service

## Getting started
1. Clone the repo
2. `npm i`
3. `npm start`

## Commands

### Docker
Build de the docker image
`docker build -t belce/ydr-user-service .`

Push it to docker hub
`docker push belce/ydr-user-service:latest`

Create a pod in kubenetes
`helm upgrade --install ydr-user-service helm/.`

Watch pod logs
`kubectl logs --follow {podName}`

Delete all pods of this chart
`helm uninstall ydr-user-service`

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).


## Docker

[Docker setup](https://blog.logrocket.com/containerized-development-nestjs-docker/)
`docker-compose up --build -V`