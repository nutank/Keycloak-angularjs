# ajency-keycloak-js

A wrapper library for keycloak javscript adapter with some additional functionality.

## Installation

`bower install --save ajency-keycloak-js`

## Basic Usage

```
  bootstrapApp(){
    // boostrapping code for your front end app
  }

  Ajkeycloak().bootstrap('keycloak.json',{
    onLoad: 'login-required'
  },bootstrapApp)

```

## Tests

  `npm run test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
