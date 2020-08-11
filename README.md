# weather-today-client 
It's front-end part of the example application: https://weather.vasily.dev

Server part is in the weather-today-server repository

## User story description:
Application presents current weather for the user location and next 5 days weather forecast for registered users.
User can change theme, visibility options and metric or imperial unit system representation. Also delete his stored account.

## Technical story:
It's the single page app.
App fetches 3h time-series by 5 days (40 records), parses data and builds current weather and 5 days forecast.
Calculates imperial units from the basic metric system, if need.
App have several routes like main weather page, settings, signIn and signUp. Stored state locally. Handles exceptions and possible errors by the server data interchange. Google authorization by the implicit grant flow.

There are next main technologies and approaches used:
1) App bootstrapped with Create React App, TypeScript template used;
2) React, redux, react-redux, react router, thunk;
3) Material UI.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
