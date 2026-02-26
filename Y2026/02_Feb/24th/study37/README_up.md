# Kubernetes (K8s) 핵심 개념 정리

---

## 1. Namespace란?

### ✔ 개념
- Kubernetes 클러스터 안에서 리소스를 **논리적으로 구분하는 공간**
- 윈도우의 "폴더"와 비슷한 개념
- 물리적으로 나뉘는 것이 아니라 **논리적으로만 분리**

### ✔ 특징
- 같은 클러스터 안에서 dev, staging, prod 환경 구분 가능
- 같은 이름의 리소스도 Namespace가 다르면 생성 가능
- Node 안에 존재하는 것이 아니라 **Cluster 전체 단위에서 구분됨**

### ✔ 기본 Namespace
- default
- kube-system
- kube-public
- kube-node-lease

---

## 2. Pod와 Container

### ✔ Pod
- Kubernetes에서 **가장 작은 배포 단위**
- 하나 이상의 Container를 포함
- Pod 내부 Container들은 네트워크(IP)와 스토리지를 공유

### ✔ Container
- 실제 애플리케이션이 실행되는 공간
- 보통 "Pod 하나당 Container 하나" 구조를 권장
- 여러 개도 가능하지만 강하게 연결된 경우에만 사용

### ✔ 주의점
- Pod가 삭제되면 내부 Container도 모두 삭제됨

---

## 3. ReplicaSet

### ✔ 역할
- 지정한 개수의 Pod를 **항상 유지**
- 예: replicas: 5 → 1개 죽으면 자동으로 새로 생성

### ✔ 특징
- 오직 "Pod 개수 유지"만 담당
- Pod를 연결하는 역할은 아님 (그 역할은 Service)

---

## 4. Deployment

### ✔ 역할
- ReplicaSet을 생성하고 관리
- 애플리케이션 배포를 담당하는 상위 개념

### ✔ 동작 방식
1. 새로운 버전 배포 시 새로운 ReplicaSet 생성
2. 기존 ReplicaSet의 Pod 수를 줄임
3. 새로운 ReplicaSet의 Pod 수를 늘림

이 과정을 통해 무중단 배포 수행

### ✔ Rolling Update
- 서버를 중단하지 않고 업데이트
- 기존 Pod를 하나씩 줄이고
- 새 버전 Pod를 하나씩 늘림
- 서비스 중단 없이 배포 가능

### ✔ 장점
- 롤링 업데이트 가능
- 롤백 가능
- 자동 복구 기능 제공

---

## 5. Service

### ✔ 역할
- 여러 Pod를 하나의 네트워크 주소(IP)로 묶어줌
- 고정된 접근 지점 제공
- 로드밸런싱 수행

### ✔ 참고
- 포트포워딩은 `kubectl port-forward` 명령어로 수행
- Service는 단순 포트포워딩 개념이 아님

---

## 전체 구조 정리

Cluster
 ├── Namespace (논리적 공간)
 │     ├── Deployment
 │     │      ├── ReplicaSet
 │     │      │       ├── Pod
 │     │      │       │     └── Container
 │     └── Service

---

# 초등학생도 이해할 수 있는 설명

Kubernetes는 큰 아파트라고 생각하면 쉽다.

- Cluster = 아파트 전체
- Namespace = 아파트 층
- Pod = 하나의 집
- Container = 집에 사는 사람
- ReplicaSet = 집 개수 관리인
- Deployment = 건물 관리자 (리모델링 담당)
- Service = 아파트 대표 전화번호

집이 5개 필요하면 5개를 유지해주고,
리모델링할 때는 하나씩 바꾸면서 공사한다.
그래서 사람들이 사는 동안에도 업데이트가 가능하다.

---

# 정리 핵심 포인트

- Namespace는 논리적 분리 공간
- ReplicaSet은 Pod 개수 유지
- Deployment는 ReplicaSet 관리 및 배포 담당
- Service는 Pod 접근을 위한 네트워크 창구
- Rolling Update는 무중단 배포 방식



# 📂 Namespace = 아파트 층
- 1층은 개발팀
- 2층은 운영팀
- 3층은 테스트팀
- 층이 달라도 같은 이름 방이 있을 수 있음!

# 🚪 Pod = 하나의 집
- 집 안에는 보통 한 명(컨테이너)이 산다
- 가끔은 둘이 같이 살기도 함

# 👮 ReplicaSet = 집 개수 지키는 관리자
"집은 항상 5개 있어야 해!"
- 하나 부서지면 바로 새로 지어줌

# 🏗 Deployment = 건물 관리소장
- 집을 새 버전으로 리모델링할 때
- 하나씩 바꾸면서 공사함
- 사람들이 사는 동안에도 공사 가능 (롤링 업데이트)

# 🌉 Service = 아파트 대표 전화번호
- 집이 여러 개 있어도
- 전화번호는 하나
- 전화하면 아무 집이나 연결해줌
