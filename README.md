# Base Component Template

Our Base Component is where you should start when creating a new component for the codebase.

## Prerequisites

This setup assumes you already have an NPM account, if you don't then [Sign Up](https://www.npmjs.com/signup).
Once you have an account you'll need to run:

```
yarn login
```

We use Yarn as our package manager of choice.

We currently lint the files when you run `yarn dev`. However, we recommend adding [Prettier](https://prettier.io/) to your editor and having this look over your code every time you save.

## Getting Started

Pull down the repository `cef-components` to your machine if you don't already have it.

```
git clone git@bitbucket.org:cefonline/cef-components.git
```

Take a copy of (or git clone) the files inside this directory. Create your new component directory and place these files inside. Inside your newly created folder you will need to update the class name and export statement within the `index.js` file to be your component name.

Go in to the `package.json` file and update the name (don't remove the cef scope), description, author keys.

## Installation

This first thing you're going to want to do is install the packages you need. To do this you should run the following from within the component directory:

```
yarn install
```

This will check your `package.json` file and install any necessary dependencies for you.

You're going to want to link your your component to the project you're using. This means that we don't have to publish after every single change. The easiest way to do this is to run `yarn link` in the component directory and then run `yarn link COMPONENTNAME` in the project directory.

Inside your project you're now going to import your component in to the necessary JS file.

```
import { BaseComponent } from "COMPONENTNAME";
```

You should then be able to render the component out anywhere you require it.

You should now run `yarn dev` from within your components folder. This will watch for any changes you make in the `src` directory and if your link above has been set up correctly then after every time you save your component the project should update with the changes.

## Updating

If you're updating this component, please increment the version inside the `package.json` and make a note of these changes in the `CHANGELOG`.

When you publish the component yarn will prompt you to update the version number. However, you are able to do this manually if needs be:

```
yarn version --new-version
```

## Linting

There is an `.eslintrc` file within the component directory. Every time you run `yarn dev` and save your file(s) the linter will check over your code. If there is an error in your code then the build will fail. If you project isn't automatically refreshing after an update you will probably see an error in the console which needs fixing first.

## Running the tests

When you run `yarn dev` it will automatically run any tests that live inside the `index.test.js` file.

### Snapshot testing

Component snapshot tests are unit tests. They are testing to see if the component has changed from what has previously been expected. If it has, then we throw an error on the command line to let us know what we either need to change the component because it something it causing it to no longer look as we expected - or - to update the tests.

```
import React from "react";
const ReactTestRenderer = require("react-test-renderer");
import { BaseComponent } from "./index.js";

describe("Snapshot test", () => {
  it("Should compare the component with a snapshot", () => {
    const component = ReactTestRenderer.create(<BaseComponent />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

```

All these tests create a `__snapshot__` directory within the `src` folder. To update the snapshot we need to run:

```
yarn test -u
```

## Publishing

Once you're finished building the component and your pull request has been merged you're going to want to publish it to the NPM registry so we can use it across projects. The first thing you need to do is remove the symlink you created earlier.

From inside your project folder run:

```
yarn unlink COMPONENTNAME
```

Then from within the component folder run:

```
yarn unlink
```

If you now exit and re-run your webpack server on the project, it should throw an error message that the component is not found.

You then need to run the following to prepare your `./dist` folder ready for publishing. This will completely remove the old `./dist` folder and build a new one.

```
yarn prepare
```

Next you need to publish the component, you can do this by running the following (please ensure you include the --access flag):

```
yarn publish --access public
```

It will first ask you to bump the version number (if you didn't do it manually earlier), please make sure you follow [SemVer](http://semver.org/) conventions and any changes are added in to the `CHANGELOG`.

If this is the first time you've published to NPM it will ask for your password. Just follow the on-screen prompts.

Finally, you're going to want to add this to your project, to do so you need to run:

```
yarn add COMPONENTNAME
```

Once again exit and re-run your webpack server and you should now be using your newly published component direct from the NPM registry.

## Built With

* [React](https://reactjs.org/)
* [ESLint](https://eslint.org/docs/rules/)
* [Babel](https://babeljs.io/)
* [Yarn](https://yarnpkg.com)

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* Michael Pallister - [@micp](https://www.npmjs.com/~micp)

## License

This project is licensed under the MIT License.
