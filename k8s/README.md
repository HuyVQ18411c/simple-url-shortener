# Notes:
## Use local docker image with MicroK8S:
- Build docker image
- Save docker image to tar file: `docker save mynginx > myimage.tar`
- Import image to MicroK8S: `microk8s ctr image import myimage.tar` 
- Ensure image present in MicroK8S repo: `microk8s ctr images ls`
- Use image tag that you used to export the image in yaml file.

* Note: imagePullPolicy must be set to `Never`, else, it will pull image from Docker registry instead.

## Create essential secrets
- Create web-server-secrets: 
```
mckb create secret generic web-server-secrets --from-literal=db-user=<your-user> --from-literal=db-password=<your-password>
```
### Notes:
- You should create secrets beforehand, else deployments will raise errors.
- There are multiple options to create secrets. From the command above, we are creating secret from literal (plain text) which in practice will be dangerous. Since your commands are saved and can be viewed from terminal. You can encode data before create secrets or create from file. More [details](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/)
