## 쿠버네티스에서 .env 사용하는 방법
- .env를 쿠버네티스에서는 컨피그맵(ConfigMap)을 이용하여 사용이 가능하다.
  * https://kubernetes.io/ko/docs/concepts/configuration/configmap/
- 그중 .env중 감추고 싶은항목은 시크릿(Secret)을 이용한다.
  * https://kubernetes.io/ko/docs/concepts/configuration/secret/

## 쿠버네티스 LoadBalancer
- LoadBalancer를 이용하면 localhost로 연결이 된다.


## 쿠버네티스에서 프론트 등록 방법
- 현재 프론트는 2번 빌드를 해야하는데 이부분을 파드로 작업하여 올리는 방법이 있다.
  * https://kubernetes.io/ko/docs/concepts/workloads/pods/init-containers/