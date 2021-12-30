# Swarmodoro
Swarmodoro helps agile developers stay on track during group swarms.
The app quickly sets a timer for the swarming interval, and get notified with a sound when it is time to switch typists.
The team can also choose the next typist from the randomly ordered list of teammates, and continue swarming!

Published website: https://swarmodoro.web.app/

## Feature Highlights
- Simple and intuitive UI with [`bootstrap`](https://getbootstrap.com/).
- Timer alert in both pop-up window and sound alert.
- Swarm times can be set differently, depending on use.
- Randomly generates the list for the next typist.

## Dependencies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>
Run the following before open the [localhost](http://localhost:3000) via `npm start`:
```
$ npm install
```
Other testing dependencies: [`Jest`](https://jestjs.io/), [`Cypress`](https://www.cypress.io/)

## Dev Notes
Follow the steps to deploy the web app on firebase:
```
$ npm run build
$ firebase deploy
```

Trello Board: https://trello.com/b/mfwMCEOj/swarmodoro
