# 5. Docker File 빌드하기

### 사용한 Dockerfile 내용

```bash
FROM centos:7
```

---

### Dockerfile build 기본 명령어

```bash
docker build [OPTIONS] PATH | URL | -
```

### 사용되는 Option 종류

`-t, --tag` > 태그를 지정 하기

```bash
docker build -t [이미지명:태그명] .
```

`-f` > Docker File 경로 지정 하기

```bash
docker build -f [디렉토리경로/파일명] .
```

`--pull=true` > FROM에서 사용한 이미지 최신으로 다시 받기

```bash
docker build --pull=true . .
```

---

### Docker 컨테이너 이미지로 만들기 (Commit)

```bash
docker commit [OPTIONS] CONTAINER [REPO/IMG:TAG]
```

### Commit Options

`-a` > 작성자 설정

`-m` > 설명(Message) 설정

### 실행 중인 컨테이너 `test-container`를 test/centos:1.0 만들기

```bash
docker commit -a "사용자명" -m "설명문" test-container test/centos:1.0
```

---

### Table of Contents

###### [0. Docker 알아보기](../)

###### [1. Docker 설치](../page1)

###### [2. Docker 기본 명령어](../page2)

###### [3. Docker 실행(Run)](../page3)

###### [4. Docker File 만들기](../page4)

#### 5. Docker File 빌드하기

###### [6. Docker Compose 기본 명령어](../page6)
