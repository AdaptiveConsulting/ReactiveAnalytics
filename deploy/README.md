# Deploy

Quick reference to manage Adaptive Insights deployment.

## Deployment of insights in a Kubernetes cluster in the cloud from local

The following instructions will explain the process of deployment and how to install insights in a Kubernetes cluster.

### Prerequisites

* A Kubernetes cluster up and running
* A Service account in the Cloud provider to authenticate against the cluster
* Gsutil
* Helm
* Tiller installed in the cluster (kube-system namespace)

### Installing

The installation is done through Helm. Helm will automatically apply the configurations and install the resources in the cluster.

Inside the repository, navigate to _deploy_ directory.

Run the _install-sh.sh_ script passing the kubernetes cluster namespace argument.

```
sh install-chart.sh insights
```

OPTIONAL: You can run the script without specifying the argument. It defaults to the namespace _insights_.

```
sh install-chart.sh
```

The helm release is created now. In the console you should see the resources contained in this release.

## Updating an existing deployment of Insights

When there are changes in the deployment, resource definitions, or simply new endpoints, ports or other things have been added, instead of deleting the release, we can update it.

Considering that we are inside the directory _deploy_:

```
helm upgrade insights insights
```
Where the first insights is the chart name, and the second insights is the path to the chart.

## Removing a deployment of Insights

Removing a helm release will terminate all the resources created in the cluster by helm. To remove the release:

```
helm delete insights --purge
```

Where _insights_ is the name of the release. (Find the name inside insights/Chart.yaml).

## Work yet to do
* Check if the namespace passed in the argument of the script _install-chart.sh_ exists. Otherwise, create it.
