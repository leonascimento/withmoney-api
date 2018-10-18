# WithMoney API

It is a project of money control

[![Maintainability](https://api.codeclimate.com/v1/badges/fd2c888e3a8f375c2976/maintainability)](https://codeclimate.com/github/davidcostadev/api-withmoney/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fd2c888e3a8f375c2976/test_coverage)](https://codeclimate.com/github/davidcostadev/api-withmoney/test_coverage)
[![Build Status](https://travis-ci.org/davidcostadev/api-withmoney.svg?branch=master)](https://travis-ci.org/davidcostadev/api-withmoney)
[![codecov](https://codecov.io/gh/davidcostadev/api-withmoney/branch/master/graph/badge.svg)](https://codecov.io/gh/davidcostadev/api-withmoney)

## Instalation

1. cp config/database.json.example config/database.json
2. cp .env.example .env
3. yarn
4. yarn run sequelize db:migrate

## Development

To use in development environment always run the `yarn run sequelize db:migrate` before, and you can

`yarn run sequelize db:seed:all` #in development

run `yarn run dev` to start the server.

## Tests

`yarn run test:createdb` - To create a database of test.
`yarn run jest`

## Production

`yarn run deploy setup # first time`

`yarn run deploy`
