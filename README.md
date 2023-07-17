# URL shortener
URL shortener with Kubernetes (MicroK8S)

I have worked with many products leverage K8S, however, I was too busy to work on the codebase and delivery, I hardly have many chances too understand what is K8S, and parts of it. Therefore, on the way learning (to design) Microservice Arch, I want to grab K8S and learn it seriously.
## Installation
### Prerequisites:
- Docker (24.0.4)
- Docker Compose (v2.19.1)
- NodeJS (16.20.1)
- MicroK8S (v1.27.2)
- Kubernetes (v1.27.3)
### Setup:
Since [docker-compose.yaml](https://github.com/HuyVQ18411c/simple-url-shortener/blob/develop/docker-compose.yaml) is provided, you can simply run: `docker compose up -d` to run full application locally in detach mode.

For anyone who in hardcore mode, you can install each component saparately:
- MySQL (8.0)
- Nginx (1.25)
## Notes:
- This project is inspired by a system design topic: [Pastebin](https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/pastebin).
- Pre-mature optimization may be painful.
- Microservices may not always be suitable for every application. There is a good video talking about [StackOverFlow Arch](https://www.youtube.com/watch?v=fKc050dvNIE&ab_channel=ByteByteGo) which embrace Monolithic architecture.