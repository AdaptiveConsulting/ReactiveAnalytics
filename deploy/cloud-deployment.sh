#!/bin/sh

kubectl create -f service.yaml --namespace="insights"
sleep 10
kubectl create -f client-nginx-cm.yaml --namespace="insights"
sleep 10
kubectl create -f deployment.yaml --namespace="insights"
