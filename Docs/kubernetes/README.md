<img src="./images/kubernetes-0.png" width="200">

## (1) Kubernetes란

> `컨테이너 오케스트레이션 플랫폼`
- → 많은 수의 `컨테이너`(Docker 등)를 자동으로 `배포, 확장, 복구, 관리`해주는 시스템

| `항목` | `설명` |
| :---: | :---: |
| 등장 배경 | 컨테이너 서비스가 많아지며 자동화된 관리 필요 |
| 핵심 목적 | 무중단 서비스, 자동화된 운영, 확장성 |
| 개발 주체 | Google에서 개발 → CNCF가 관리 |
| 별칭 | K8s(글자수 줄여 K + 8글자 + s) |

## (2) 해결하는 문제

| `기존(서버 직접 운영)`| `Kubernetes 사용` |
| :---: | :---: |
| 서버 장애 시 수동 복구 | 자동 재시작/재배포 |
| 사용자 증가 시 서버 증설 필요 | 자동 Scale-out |
| 운영 방식 비표준 | 선언적 배포(Manifest 파일) |
| 환경 불일치(개발 vs 운영) | 컨테이너 기반으로 동일 환경 |

## (3) 주요 구성 요소

<img src="./images/kubernetes-1.png" width="500">

> Control Plane(마스터 노드)

| `구성 요소` | `역할`|
| :---: | :---: |
| API Server | 클러스터 조작의 엔트리 포인트 |
| Controller Manager | 오브젝트 상태 유지(Desired vs Actual) |
| Scheduler | Pod 배치 결정 |
| etcd | Key-Value 기반 클러스터 정보 저장 |

> Worker Node(워커 노드)

| `구성` | `역할` |
| :---: | :---: |
| Kubelet | Pod 관리, 노드 상태 보고 |
| Kube Proxy | 네트워크 라우팅 관리 |
| Container Runtime | Docker, containerd 등 |

## (4) 핵심 리소스

| `리소스` | `설명` |
| :---: | :---: |
| Pod | 가장 작은 배포 단위(컨테이너 1개 이상 포함) |
| Deployment | Pod 업데이트/복구 자동 관리 |
| Service | 안정적인 접근 Endpoint 제공(Load Balancer) |
| Ingress | 외부 트래픽을 라우팅(도메인/URL 관리) |
| ConfigMap / Secret | 설정 및 민감 정보 관리 |
| Namespace | 리소스 분리 |

## (5) 자동화 기능

| `기능` | `설명` |
| :---: | :---: |
| self-healing | Pod 오류 시 자동 재시작 |
| auto scaling(HPA) | 트래픽 증가 시 Pod 자동 확장 |
| rolling update | 무중단 업데이트 |
| resource monitoring | CPU/MEM 기반 운영 |

> Pod 3개 유지 선언 → 하나 죽어도 컨트롤러가 자동 복구

## (6) 배포 Workflow 예시

```bash
# YAML(manifest)에 원하는 상태 선언
kubectl apply -f deployment.yaml

# 컨트롤 플레인이 스케줄링
Scheduler -> Worker Node 선택

# Kubelet이 Pod 실행
Container Runtime에서 컨테이너 실행
```

> → 선언형 관리: `어떻게`가 아니라 `무엇`을 원하지?

## (7) Networking & Service 접근

<img src="./images/kubernetes-2.png" width="600">

| `Service 유형` | `접근 형태` |
| :---: | :---: |
| ClusterIP | 내부 통신 |
| NodePort | 노드 IP + Port |
| LoadBalancer | 클라우드 LB 연계 |
| Ingress | 도메인 기반 라우팅 제어 |

<img src="./images/kubernetes-3.png" width="600">

## (8) Kubernetes와 MSA(Spring Boot + React)

| `구성 요소` | `K8s에서 역할` |
| :---: | :---: |
| Spring Boot MSA | 각각 Pod + Deployment |
| Spring Cloud Gateway | API Gateway → Ingress와 연동 |
| React 프론트엔드 | Static 웹 배포(Pod) |
| Kafka, Redis, DB | StatefulSet + PV(Persistent Volume) |

> 제조/창고/판매/운송 시스템을 각각 `독립 배포 + 자동 확장 + 장애 복구` 가능

## (9) 어디에서 Kubernetes를 사용할까?

| `환경` | `설명` |
| :---: | :---: |
| Minikube, K3s | 로컬 개발 |
| EKS(AWS), GKE(GCP), AKS(Azure) | 클라우드 운영 |
| On-prem(Kubeadm) | 자체 서버 구축 |
