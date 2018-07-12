# Build Reactive Analytics locally

## Pre-requisites

* [npm](https://www.npmjs.com/)
* [yarn](https://yarnpkg.com/lang/en/) (optional)
* [lerna](https://lernajs.io/)
* [serve](https://www.npmjs.com/package/serve) (optional)

## Build

**(1) Copy the repository to your local computer and once copied, navigate to the root folder of the repository.**

**(2) Domain replacement.**

For local, it will not be needed to do any replacements in domain/ip addresses as it's going to be used localhost and the default ports. 

**(3) Download the dependencies (node_modules) for the modules of the project.**

This project is using lerna. One of the features is that it can handle the dependencies for all the modules in a single run. 

To do so, in the root folder, where the file `lerna.json` is, type: `lerna bootstrap`.

This will download the node_modules in the modules stated in "packages" inside the lerna.json file. To avoid building for a certain module, is enough to remove the relevant package.

**(4) (OPTIONAL) Build the client.**

To build the client is only required when is wanted to serve static contents instead of running react app with it's own scripts. The application can be run in local without the static contents.

To build the client, navigate to the folder _client_ and run `npm run build` or `yarn run build`. This will create the static content for the client.

**To run the recently built application, refer to the document [here](../deployment/deploy-reactive-analytics-locally.md)**
