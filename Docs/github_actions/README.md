## 1. GitHub Actions란

GitHub Actions는 다음과 같은 작업을 자동으로 수행할 수 있는 GitHub 내장 기능입니다.

* Push/PR 시 자동 테스트 실행
* 빌드/패키징
* Docker 이미지 생성 및 배포
* AWS/GCP/Azure/Cloudflare 등으로 자동 배포
* 정기 작업(Cron) 실행
* Issues/PR 자동 관리
* 반복적 수동 작업 자동화

## 2. 구성 요소 상세 설명

### 2.1 Workflow

* GitHub Actions의 **실행 단위**
* `.github/workflows/*.yml` 파일에 정의
* 저장소에 push되는 순간 활성화

예: `ci.yml`, `deploy.yml` 등의 파일

### 2.2 Event

워크플로우를 **트리거하는 이벤트**
대표적인 이벤트:

| 이벤트                 | 설명                    |
| ------------------- | --------------------- |
| `push`              | 특정 branch에 push할 때 실행 |
| `pull_request`      | PR 생성/업데이트 시 실행       |
| `workflow_dispatch` | 수동 실행 버튼 제공           |
| `schedule`          | Cron 기반 정기 실행         |
| `release`           | 릴리즈 생성 시 실행           |

### 2.3 Job

* Workflow 안의 **작업 단위(병렬/순차 수행 가능)**
* 각 Job은 서로 독립적인 가상환경에서 실행됨

예:

```yaml
jobs:
  test:
  build:
  deploy:
```

### 2.4 Runner

* Job이 실행되는 **컴퓨팅 환경**

* GitHub이 제공하는 호스트 runner:

  * `ubuntu-latest`
  * `windows-latest`
  * `macos-latest`

* 또는 개인 서버에서 **Self-Hosted Runner**로 실행 가능

### 2.5 Step

* Job 내부에서 실제 실행되는 명령들이며 순서대로 실행됨

예:

```yaml
steps:
  - uses: actions/checkout@v4
  - run: npm install
  - run: npm test
```

### 2.6 Action

* Step에서 사용할 수 있는 **재사용 가능한 모듈**
* JavaScript 또는 Docker 기반
* GitHub Marketplace에서 다양한 Action 제공

예:
`actions/checkout`, `actions/setup-node`, `docker/login-action` 등

## 3. GitHub Actions 동작 방식

1. 이벤트 발생 (push/PR 등)
2. 정의된 workflow 파일이 트리거됨
3. 지정된 runner 환경이 생성됨
4. jobs → steps 순서로 실행
5. 성공/실패에 따라 GitHub UI에서 결과 확인

## 4. 최소 예시 (Node.js 테스트)

```yaml
# .github/workflows/node-ci.yml
name: Node.js CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```

## 5. 고급 기능

### 5.1 Matrix Builds (여러 OS/버전 테스트)

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [16, 18]
```

### 5.2 Secrets (민감 정보)

GitHub 저장소의
**Settings → Secrets → Actions**
에서 환경변수를 등록한 후 다음처럼 사용:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 5.3 Cache (종속성 캐싱)

빌드 속도 향상 가능

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('package-lock.json') }}
```

## ✔ 5.4 Artifact 저장

테스트 결과, 빌드 결과물 등을 저장 가능:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-result
    path: dist/
```

### 5.5 Job 간 의존성

```yaml
jobs:
  build:
  test:
    needs: build
```

## 6. GitHub Actions의 장점

| 장점 | 설명 |
| :---: | :---: |
| GitHub에 내장 | 별도 CI 서버 필요 없음 |
| Marketplace 풍부 | 수많은 Action 모듈 재사용 가능 |
| 강력한 통합 | GitHub PR, Issues와 자연스럽게 연동 |
| 무료 실행 | 공개 저장소는 무제한 무료 |
| Self-Hosted Runner | 사내 서버에서도 실행 가능 |

## 7. 사용할 때 주의점

* Private repo의 Actions 실행에는 **분당 과금** 모델 존재
* 장시간 실행은 비용 증가
* Secrets는 로그에 노출되지 않도록 주의
* Workflow 파일 커밋 → 바로 실행됨
