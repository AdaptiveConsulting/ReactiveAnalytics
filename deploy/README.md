# Deploy

Quick reference to manage Adaptive Reactive Analytics deployment.

## Deployment of Reactive Analytics in a Kubernetes cluster in the cloud from a local computer

The following instructions will explain the process of deployment and how to install Reactive Analytics in a Kubernetes cluster.

### Prerequisites

* A Kubernetes cluster up and running
* A Service account in the Cloud provider to authenticate against the cluster
* Gsutil
* Helm
* Tiller installed in the cluster (kube-system namespace)
  * If tiller is not installed in the cluster and you had to install it, is possible that you will need to configure the cluster role binding for helm to be able to access tiller in the cluster. To do so, run clusterrolebinding.yaml provided in the "reactive-analytics" folder, in "kube-system" namespace. This script already creates the service account. Then, right after that, you will need to install tiller using the service account you already provided: `helm init --service-account="tiller"`
  * Note that the `helm init --service-account="tiller"`, the own service account should coincide with the one setted in "clusterrolebinding.yaml" file.

### Installing

The installation is done through Helm. Helm will automatically apply the configurations and install the resources in the cluster.

Inside the repository, navigate to _deploy_ directory.

Run the _install-sh.sh_ script passing the following arguments:

```
bash install-chart.sh \
  $client_tag \
  $server_tag \
  $namespace \
  $loadBalancerIP \
  $domain_name \
  $environment
```

The values stated in the previous command corresponds to:

**client_tag**: The tag of the client. They are pushed in Google Cloud Container Registry. It is formed by the environment-version-gitHash structure.

**server_tag**: Exactly the same as the client, but being the server.

**namespace**: The namespace that will be created in the Kubernetes cluster. Convention: `environment-reactive-analytics`.

**loadBalancerIP**: The IP assigned to a domain. This one can be found in Google Cloud External IPs.

**domain_name**: Name of the domain that is assigned to a certain IP. Convention: `environment-reactive-analytics.adaptivecluster.com`

**environment**: OPTIONAL. Is the name of the environment, like it could be "dev", "test", etc... When the environment is "DEMO", the parameter should be empty.

The helm release is created now. In the console you should see the resources contained in this release.

## Updating an existing deployment

When there are changes in the deployment, resource definitions, or simply new endpoints, ports or other things have been added, instead of deleting the release, we can update it.

Considering that we are inside the directory _deploy_:

```
helm upgrade reactive-analytics reactive-analytics
```
Where the first "reactive-analytics" is the chart name, and the second is the path to the chart.

## Removing a deployment

Removing a helm release will terminate all the resources created in the cluster by helm. To remove the release:

```
helm delete reactive-analytics --purge
```

Where _insights_ is the name of the release. (Find the name inside reactive-analytics/Chart.yaml).
