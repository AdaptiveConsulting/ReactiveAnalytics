#!/bin/sh

helm install insights\
    --name="insights" \
	--version=0.0.1   \
	--set sslSecret.certcrt="$(. /c/Users/Lluis/AppData/Local/Google/Cloud\ SDK/google-cloud-sdk/bin/gsutil.sh cat gs://adaptivecluster-secrets-ssl/cert.crt)" \
	--set sslSecret.certkey="$(. /c/Users/Lluis/AppData/Local/Google/Cloud\ SDK/google-cloud-sdk/bin/gsutil.sh cat gs://adaptivecluster-secrets-ssl/cert.key)" \
    --values="insights/values-demo.yaml" --namespace="insights"