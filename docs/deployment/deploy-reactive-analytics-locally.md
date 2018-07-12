# Deploy Reactive Analytics locally

Before running the application, it has to be built first. If it haven't, go [here](../build/build-reactive-analytics-locally.md) to learn how to build it.

## Run the application

**(1) Run the application**

**Run the application without having built the client**

Navigate to the root folder, where lerna.json file is, and run `yarn start`. This will run the entire application including the client.

**Run the application with static files**

Go to the root folder and edit the `lerna.json` file. Remove the _client_ package. Save and exit.

Open a console, navigate to the root folder where the file `lerna.json` is and type `npm start` or `yarn start`.

Open another console, navigate to the build folder _(client/build)_ and type `serve -l 3000`. Is important that the port is 3000.
