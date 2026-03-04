<img src="./images/jenkins-0.png" width="100">

## (1) Jenkins란

- `Jenkins`는 오픈소스 기반의 `CI/CD(지속적 통합 / 지속적 배포)` 자동화 서버입니다.
- 개발자가 소스코드를 push하면, Jenkins가 자동으로 `빌드 → 테스트 → 배포`까지 수행해주는 역할을 합니다.

> GitHub/GitLab 등과 연동하여, 코드를 변경할 때마다 자동 파이프라인 실행 가능

## (2) 특징

| `기능` | `설명` |
| :---: | :---: |
| 자동 빌드 & 테스트 | Git 기반 소스 변경 시 자동 파이프라인 수행 |
| 플러그인 기반 확장 | 1,800개 이상의 플러그인 제공 |
| 다양한 환경 지원 | Docker / Kubernetes / AWS / Azure / Linux / Windows |
| 파이프라인(Pipeline as Code) | Groovy 스크립트로 빌드 과정을 코드로 관리 |
| 분산 빌드(Agent 활용) | 멀티 서버에서 병렬 빌드 처리 |

<img src="./images/jenkins-1.jpg" width="600">

## (3) CI/CD 개념에서 Jenkins의 위치

| `단계` | `Jenkins가 하는 일` |
| :---: | :---: |
| `CI` (지속적 통합) | 코드 빌드 및 자동 테스트 수행 |
| `CD` (지속적 배포/전달) | 스테이징/운영 서버 자동 배포  |

> 동작 흐름 예시
- 개발자가 코드를 push → Jenkins 자동 실행 → 빌드 성공 → Docker 이미지 생성 → Kubernetes 배포

<img src="./images/jenkins-2.gif" width="600">

## (4) Jenkins Pipeline 종류

| `파이프라인 방식` | `설명` | `예시` |
| :---: | :---: | :---: |
| Freestyle Project | GUI 기반 설정 | 소규모 프로젝트에 적합 |
| Pipeline Script (선언형/스크립트형) | Jenkinsfile로 빌드 정의 | DevOps 실무 표준 |
| Multi-branch Pipeline | 브랜치별 자동 파이프라인 구성 | Git Flow와 연동 유리 |

## (5) Jenkinsfile 예시

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
```

> 이 파일을 저장소 루트에 추가하면 Jenkins가 자동 인식합니다.


## (6) Jenkins 아키텍처 구조

| `구성` | `역할` |
| :---: | :---: |
| Controller (Master) | 파이프라인 관리, 스케줄링 |
| Agent (Node) | 실제 빌드/테스트/배포 실행 |

> 빌드 성능 확장과 병렬 작업이 가능

<img src="./images/jenkins-3.png" width="600">

## (7) 대표적인 연동 (`플러그인`)

| `카테고리` | `플러그인 예시` |
| :---: | :---: |
| VCS | Git, GitHub, GitLab |
| 컨테이너 | Docker, Kubernetes |
| 클라우드 | AWS, GCP, Azure |
| 빌드 도구 | Maven, Gradle, npm, Yarn |
| 메시지/알림 | Slack, Email |

> Jenkins의 가장 큰 장점 → `풍부한 플러그인 생태계`

## (8) Jenkins vs GitHub Actions / GitLab CI 비교

| `항목` | `Jenkins` | `GitHub Actions / GitLab CI` |
| :---: | :---: | :---: |
| 설치 | 직접 설치 필요 | 클라우드 기반 기본 제공 |
| 유지보수 | 필요 | 비교적 적음 |
| 확장성 | 무한대 | 플랫폼 제한 있음 |
| 비용 | 무료(운영 비용 필요) | 무료 플랜 제한 |

> `자유도는 Jenkins↑`, `관리 편의성은 GitHub/GitLab CI↑`

## (9) Jenkins를 쓰면 좋은 경우

- 사내망에서 구축해야 하는 경우
- 복잡한 배포 자동화를 직접 커스터마이징해야 할 때
- Docker/K8s 중심 고도화 환경 운영 시
- 멀티 환경 / 멀티 서버 확장 필요 시

## (10) 대표 자동화 예시

| `흐름` | `도구` |
| :---: | :---: |
| 소스 가져오기 | GitHub/GitLab |
| 빌드/테스트 | Maven/Gradle/JUnit |
| 배포 | Docker → Kubernetes(EKS/GKE) |
| 알림 | Slack 알림 |

> `Commit → Build → Test → Deploy` 완전 자동화
