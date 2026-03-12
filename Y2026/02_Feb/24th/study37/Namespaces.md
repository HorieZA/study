## `Namespaces` 구성하기

- 목록 보기
```bash
kubectl get namespaces
```
`or`
```bash
kubectl get ns
```

- 현재 사용 중인 context 자세하게 확인
```bash
kubectl config get-contexts
```

- 현재 사용 중인 context 이름만 확인
```bash
kubectl config current-context
```

- 현재 사용 중인 Namespaces의 pod 확인
```bash
kubectl get pods
```
- n1이라는 ns 생성
```bash
kubectl create namespace n1
```

- yaml 생성
```bash
kubectl create namespace n2 --dry-run -o yaml > n2-ns.yaml
```
- `팁`
{--dry-run => 테스트용으로}
{-o => 자세하게}

- n2-ns.yaml파일이 생성되면 아래 내용 삭제
spec: {}
status: {}

- yaml 파일을 생성 후 다음 입력하여 n2 생성
```bash
kubectl create -f n2-ns.yaml
```

- Pod 생성
```bash
kubectl run web --image=nginx:1.28 --port 80 -n n1
```

- yaml형태의 Pod 생성 테스트
```bash
kubectl run web --image=nginx:1.28 --port 80 -n n1 --dry-run -o yaml
```

- Namespaces의 Pod 전부 확인 방법
```bash
kubectl get pods --all-namespaces
```

- n1이라는 Namespaces의 Pod 확인 방법
```bash
kubectl get pods -n n1
```

- Context 생성 및 등록
```bash
kubectl config set-context n1-context --cluster=docker-desktop --user=docker-desktop --namespace=n1
```

- Context 보기
```bash
kubectl config view
```

- Context 교체
```bash
kubectl config use-context n1-context
```

- Context 삭제
  * 삭제 전 교체한 Context가 존재하는 경우 기본 값으로 변경 후 삭제 필요
```bash
kubectl config delete-context n1-context
```

- 클러스터 실행 상태 확인
```bash
kubectl cluster-info
```