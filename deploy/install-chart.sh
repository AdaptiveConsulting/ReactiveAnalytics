#!/bin/sh

if [ $# -lt 5 ]; then
  echo "" >&2
	echo "Usage: [CLIENT_TAG] [SERVER_TAG] [NAMESPACE] [LOAD_BALANCER_IP] [DOMAIN_NAME]" >&2
	echo "" >&2
	echo "    [CLIENT_TAG] Tag from docker image that will be used by kubernetes to fetch the artifact from GCP." >&2
	echo "    [SERVER_TAG] Tag from docker image that will be used by kubernetes to fetch the artifact from GCP." >&2
	echo "    [NAMESPACE] Kubernetes cluster namespace that will be used as release name." >&2
	echo "    [LOAD_BALANCER_IP] IP of the load balancer assigned to this release. Find in GCP." >&2
	echo "    [DOMAIN_NAME] Name of the domain binded to the load balancer IP." >&2
	echo "    [ENVIRONMENT] Environment where the application will be deployed. Example format: (DEV), (TEST)..." >&2
	echo "" >&2
	echo "CAUTION: Load balancer IP and domain name should be tied previously." >&2
	echo "" >&2
  exit 1
fi

client_tag="${1}"
server_tag="${2}"
namespace="${3}"
loadBalancerIP="${4}"
domain_name="${5}"
environment="${6}"

helm upgrade "$namespace" insights \
  --install \
	--version=0.0.1 \
	--set deploymentClient.image.tag="$client_tag" \
	--set deploymentServer.image.tag="$server_tag" \
	--set sslSecret.fullchaincrt="$(gsutil cat gs://adaptivecluster-secrets-ssl/fullchain.crt)" \
	--set sslSecret.certkey="$(gsutil cat gs://adaptivecluster-secrets-ssl/cert.key)" \
	--set serviceClient.loadBalancerIP="$loadBalancerIP" \
	--set deploymentClient.nginxConf.domainName="$domain_name" \
	--set openFin.environment="$environment" \
  --namespace="$namespace"
