#!/bin/sh

kubectl create -f service.yaml --namespace="insights"
kubectl create -f client-nginx-cm.yaml --namespace="insights"
kubectl create -f deployment.yaml --namespace="insights"
