#!/bin/sh

client_tag="${1}"
server_tag="${2}"
namespace="${3}"
loadBalancerIP="${4}"
domain_name="${5}"

helm install insights \
    --name="$namespace" \
	--version=0.0.1   \
	--set deploymentClient.image.tag="$client_tag" \
	--set deploymentServer.image.tag="$server_tag" \
	--set sslSecret.certcrt="$(gsutil cat gs://adaptivecluster-secrets-ssl/cert.crt)" \
	--set sslSecret.certkey="$(gsutil cat gs://adaptivecluster-secrets-ssl/cert.key)" \
	--set serviceClient.loadBalancerIP="$loadBalancerIP" \
	--set deploymentClient.nginxConf.domainName="$domain_name" \
    --namespace="$namespace"