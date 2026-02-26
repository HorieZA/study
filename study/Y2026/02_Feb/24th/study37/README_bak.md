## 쿠버네티스 K8s Namespaces : `kubectl`

- `Namespaces`란? 윈도우로 보면 `하나의 폴더`라고 보면된다.
- `Namespaces`는 `K8s Node`안에 있다.
- Namespaces `논리적`으로만 나누어져 있다.
- `Pod`는 `하드`를 만든다고 보면 된다.
- `Pod`안에는 `Container`가 들어가며, `Container`는 용도에 따라 달라지기도 한다.
- Pod `기본 배이스`는 `Pod 하나당 Container 하나`로 진행하는것을 지향한다. 
- `Container`는 여러개 생성이 가능하지만 Pod가 삭제되면 Pod 안에 있는 Container가 전부 삭제 되므로, 가급적 많이 생성하지 않는게 좋다.

- `REPLICASET`는 Pod가 `과부화 되지 않도록` 같은 서비스를 사용하는 Pod를 `연결해주고 관리하는 역할`을 한다.
- 단, `REPLICASET`는 `A`이면 `A만` 보장해준다.
- `DEPLOYMENT`는 그런 `REPLICASET`를 하나 더 `생성하며 관리하는 역할`을 한다.
  ex) 첫번째 `REPLICASET`에서 5개의 `Pod`중 1개의 `Pod`에 장애가 발생하면 `DEPLOYMENT`에게 장애발생을 전달하고,
      `DEPLOYMENT`는 두번째 `REPLICASET`의 5개의 `Pod`중 1개를 실행하라고 전달 요청
      두번째 `REPLICASET`가 1개 Pod를 실행했다고 `DEPLOYMENT`에게 전달하면 `DEPLOYMENT`는 첫번째 `REPLICASET`에게 장애 발생한 `Pod`를 죽이라고 요청
      첫번째 `REPLICASET`는 장애 발생한 `Pod`를 죽이고 `DEPLOYMENT`에게 죽였다고 전달
- `DEPLOYMENT`는 `롤링업`이 가능 하다.
- `롤링업`이란? 서버가 켜져있는 상태에서 패치(업데이트)가 `실시간`으로 가능

- Kubernetes Cluster의 `Service`란? `Pod`를 외부로 연결하기 위해 포트포어딩을 해주는 역할이라고 보면 된다.
- 