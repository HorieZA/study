## Yaml 파일 작성

- `apiVersion: v1`을 확인하는 방법
  `apiVersion`은 환경에 따라 다름
```bash
kubectl explain pod
```
```bash
kubectl explain service
```

- Pod 용 yaml
  * `labels`은 중요함
  * yaml이라는 문서는 `kind`에 따라서 용도가 달라짐
  * 구분자 `---`를 넣으면 yaml문서에 Pod등 2개 이상 입력 및 생성 가능 
```yaml
apiVersion: v1
kind: Pod

metadata:
  labels:
    run: [Pod 이름]
  name: [Pod 이름]

spec:
  containers:
  - image: [docker 이미지]
      name: [container 이름]
---
apiVersion: v1
kind: Pod

metadata:
  labels:
    run: [Pod2 이름]
  name: [Pod2 이름]

spec:
  containers:
  - image: [docker 이미지]
      name: [container 이름]
```

- Deployment용 yaml 
```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: [Deployment 이름]

spec:
  relicas: [Pod 개수]
  selector:
    matchLabels:
      app: [Pod 라벨명]
  template:
    metadata:
      labels:
        run: [Pod 라벨명]
    spec:
      containers:
      - image: [docker 이미지]
          name: [container 이름]
          ports:
          - containerPort: [service port]
```

- yaml 만들기
  * 단, 라벨 이름을 바꿀려면 수동으로 만들어야함
```bash
kubectl create deployment app-dp --replicas=2 --image=nginx:1.28 --dry-run -o yaml
```
```bash
kubectl create deployment app-dp --replicas=2 --image=nginx:1.28 --dry-run -o yaml > app-dp.yaml 
```
```bash
kubectl create -f app-dp.yaml
```

- `yaml`에 label 추가 
```yaml
template:
  metadata:
    labels:
      app: [Pod 라벨명]
```

- 구동되는 것을 실시간으로 확인하는 방법
```bash
kubectl get pods --watch
```

- 수정하기
  * 메모장으로 열리며 내용 변경 및 저장 후 메모장을 닫으면 실행됨
```bash
kubectl edit deployment/app-dp
```


- Service 만들기 
```yaml
apiVersion: v1
kind: Service

metadata:
  name: app-sv

spec:
  type: NodePort
  selector:
    app: app-dp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 80
```

- 서비스 생성하기
```bash
kubectl create -f app-sv.yaml
```

- 서비스 삭제하기
```bash
kubectl delete service app-sv
```