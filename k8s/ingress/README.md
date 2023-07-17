# About Ingress
## Ingress maybe configured to:
- Give Services externally-reachable URLs
- Load balance traffic
- Terminate SSL/TLS
- Offer name-based virtual hosting

More details about Ingress [here](https://kubernetes.io/docs/concepts/services-networking/ingress/)

In this project, we will use `NGINX` [Ingress Controller with MicroK8S](https://kubernetes.github.io/ingress-nginx/deploy/#microk8s). Run: `microk8s enable ingress`