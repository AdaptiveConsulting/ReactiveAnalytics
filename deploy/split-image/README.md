# Split image notes:
-

At the moment this is work in progress.
The approach is to containerize all the modules.

client-nginx-cm.yaml:
* Should go inside deploy/. This file is an nginx configuration for a client / server communication.

deploy-client.yaml:
* This file should go inside deploy/. Contains client. Mounts configmap and should be deployed after the configmap.

deploy-non-client.yaml:
* This file should go inside deploy/. Contains non client modules.

lerna.json:
* This file should go inside deploy/. Modified to have client module removed in order to bootstrap easily the non client modules. This could change.

pre-deployment.sh:
* This file should go inside deploy/. File containing localhost substitutions. Is needed to check if the files are right and if there are other files missing.
* graphql files in client should be replaced "localhost" to ip/domain ?
* start.html and app.json in client/build "localhost" should be replaced too ?

service-client.yaml:
* This file should go inside deploy/. Creates loadbalancer and firewall rules for communication with non client pod.

service-non-client.yaml:
* This file should go inside deploy/. 

_client_Dockerfile:
* This file should ne renamed to Dockerfile and go inside client/. Dockerizes client.

docker-boot.sh:
* Runs nginx with some rules. Should be in the same directory as _client_Dockerfile

_server_Dockerfile:
* This file should be renamed to Dockerfile and go in the root folder of the project. Dockerizes all the modules except client.

# Bootstrap notes

The following are just notes that are not definitive for a future build process:

(local)
$ lerna bootstrap
	(gets node modules for ALL modules)

cd client

yarn run build

docker build client

copy deploy/lerna.json

docker build non-client (copy whole repo and remove client folder)

(container)
Inside non client:
lerna run --parallel start
