#!/bin/sh

namespace="${1:-insights}"

helm install insights \
    --name="insights" \
	--version=0.0.1   \
	--set sslSecret.certcrt="$(gsutil cat gs://adaptivecluster-secrets-ssl/cert.crt)" \
	--set sslSecret.certkey="$(gsutil cat gs://adaptivecluster-secrets-ssl/cert.key)" \
    --values="insights/values-demo.yaml" --namespace="$namespace"