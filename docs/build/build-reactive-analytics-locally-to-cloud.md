# Build Reactive Analytics locally with docker containers to be pushed to the cloud

This document shows how to build the images in your own local machine to push them to the cloud afterwards.

The module "native" is not supported yet in this project to dockerize.

## Pre-requisites

* [Docker](https://docs.docker.com/install/)

## Build

There are two Dockerfiles (One for client and another for server) that can be found in their respective folders. Those Dockerfiles will run the process of building the images and let them ready to be pushed to the cloud for their deployment.
Building the Dockerfiles will get the source code into a container which will build it. Right after, a new container is created to get the artifacts builded in the first contianer and create the final artifact image.

**(1) Build the client image**

From the root folder, run the following command:

**Note:** The bit _$domain_name_ right after --build-arg DOMAIN_NAME should be replaced for one of the existing environments: `dev` or `demo`. Also, the docker image tag version (`-0.0.1`) can be replaced for any version you like.

`docker build --no-cache -t eu.gcr.io/adaptive-reactive-analytics/reactive-analytics-client:dev-0.0.1 -f client/Dockerfile --build-arg DOMAIN_NAME="$domain_name.adaptivecluster.com" .`
 
 **(2) Build the server image**

From the root folder, run the following command:

**Note:** The bit _$domain_name_ right after --build-arg DOMAIN_NAME should be replaced for one of the existing environments: `dev` or `demo`. Also, the docker image tag version (`-0.0.1`) can be replaced for any version you like.

`docker build --no-cache -t eu.gcr.io/adaptive-reactive-analytics/reactive-analytics-server:dev-0.0.1 -f server/Dockerfile --build-arg DOMAIN_NAME="$domain_name.adaptivecluster.com" .`
