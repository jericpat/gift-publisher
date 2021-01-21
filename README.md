# GIFT DATA PUBLISHING APP

A data publishing app for GIFT. View the live site [here](https://datopian.github.io/gift-publisher)

# For Developers

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Build Component Library

To build the comoponents into libraries that can be imported into `gift-portal`, run the following

```bash
$ yarn build:lib
```

This commands builds the components without including the css import.
**NOTE**: Dont ignore the `dist/` folder while pushing new update to github and always ensure that before pushing new update to github run `yarn build:lib`

Base on the fact that `datapub` contains css and always an issue when `gift-publisher` is imported in `gift-portal`, a datapub with no css is created. Due to this a separate branch called `Package` is created.

Hence new update should be added to branch `Package`  and the following step should be taken;

1. run `yarn build:lib`
2. push new update to branch `Package`
3. include new update in `gift-portal` package.json as `"gitfpub":  "git+https://github.com/datopian/gift-publisher.git#package#add-commit-hash"`
