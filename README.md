# CrossBow

This is a simple dashboard depicting the flow of a build process.
![crossbow](https://github.com/jihdeh/build-demo/blob/master/Screen%20Shot%202016-12-13%20at%203.02.01%20PM.png)

How to run locally

```

- git clone
- yarn install or npm install
- Add enviroment variables ( NODE_ENV=development)
- e.g `NODE_ENV=development npm run dev`
- visit [http://localhost:555](http://localhost:55555)

```

Tech Stack
	* ES6
	* React/Redux
	* Recompose - for stateless functional components
	* ImmutableJS
	* RamdaJS - functional javascript
	* KoaJS - server-side
	* NodeJS - Enviroment engine


Running Test:

Tests are set up using the Jest library, for both front-end react and backend unit tests.

To run tests locally:

Run `npm run test`

More Info:

Frontend code can be found in the `app` folder, and the back-end code can be found in the `server` folder.

Front-end is being written with ReactJS and Backend with NodeJS/koaJS.


Production Build:

To run the producion build, run `NODE_ENV=production npm run build` then `npm start`

node v6.6.0
