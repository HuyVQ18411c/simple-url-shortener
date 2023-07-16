# Notes:
## Use local docker image with MicroK8S:
- Build docker image
- Save docker image to tar file: `docker save mynginx > myimage.tar`
- Import image to MicroK8S: `microk8s ctr image import myimage.tar` 
- Ensure image present in MicroK8S repo: `microk8s ctr images ls`
- Use image tag that you used to export the image in yaml file.

* Note: imagePullPolicy must be set to `Never`, else, it will pull image from Docker registry instead.