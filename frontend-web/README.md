## How to begin running react site locally
- Install npm, node.js (on linux I just used sudo apt install but on other platforms I am sure it should be easily installed)
- Once repo is cloned and dependencies are installed, navigate to the frontend-web folder from the command line
- Run the command `npm install` which will populate the node_modules folder (note that this folder is not pushed on the git repo, it is ignored on the .gitignore and please **DO NOT** commit the node_modules folder) this command only needs to be run when new dependencies are added to the package.json, should remain fairly stable
- Once dependencies have finished installing run the `npm start` command to begin hosting the website on your localhost
- Once running any time a js/css file is modified and saved it will automatically push those changes to your locally hosted site

## Deploy to AWS site(you need the AWS CLI installed and the AWS access keys, which are in the slack under credentials)
- Run the following commands:
- Builds a production version of the React site
npm run-script build
- Syncs the build artifacts with the S3 bucket hosting the kcshare website
aws s3 sync ./build/ s3://kcsharewebsite 
- Invalidates the cloudfront invalidation files, essentially telling cloudfront 
- that when you get a request for these files pull the files from the s3 bucket 
- instead of using the cached version of these files
aws cloudfront create-invalidation --distribution-id E3FZYOB0ATU0DJ --paths "/*"

## Maintainability and continued use
- Once initial setup is complete the `npm start` command should suffice as the only 'go to' command that is needed
- Respect existing naming conventions for components, filenames, variable names and method names
- If your component needs to interact with another component or send information to its parent in order to achieve its function, work in collaboration with the authors of the other components as to avoid merge conflicts and changing the code of others without them understanding what was done

---

### Below is the autogenerated README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
