# GIFT DATA PUBLISHING APP

A data publishing app for GIFT. [View the live site](https://datopian.github.io/gift-publisher).

## For developers

### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Build component library

To build the components into libraries that can be imported into `gift-portal`, run the following

```bash
$ yarn build:lib
```

This command builds the components without including the CSS import.

**NOTE**: Don't ignore the `dist/` folder while pushing new update to GitHub and always ensure to run `yarn build:lib` before pushing new updates to GitHub.

Based on the fact that `datapub` contains CSS and always an issue when `gift-publisher` is imported in `gift-portal`, a datapub with no CSS is created. Due to this, a separate branch called `package` is created.

Hence new updates should be added to the branch `package` and the following steps should be taken:

1. run `yarn build:lib`
2. push new update to branch `package`
3. include new update in `gift-portal` package.json as `"gitfpub": "git+https://github.com/datopian/gift-publisher.git#package#add-commit-hash"`
