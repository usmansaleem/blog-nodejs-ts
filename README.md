# blog-nodejs-ts
Blog backend using Nodejs + Express + TypesScript. 

## Author
Usman Saleen - usman@usmans.info

## Dependencies 
This node project uses `yarn` (https://yarnpkg.com/lang/en/) as nodejs dependency manager. Please install `yarn` separately. 

To install project dependencies (usually required when setting up project for the first time), Run

`yarn install`

## Lint
After making some changes, make sure to run lint:

`yarn lint`

## Development Mode
Run backend server in development mode (default port: 3000)
`yarn start-dev`

## Tests
Run tests:

`yarn test`

## Production Mode
To yun backend server in production mode (default port 8081), build first before running server:

- `yarn build`
- `yarn start`