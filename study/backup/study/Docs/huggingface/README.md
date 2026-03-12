<img src="./images/huggingface-0.svg" width="200">

## (1) 개요

- **회사명:** Hugging Face Inc.
- **설립:** 2016년 (프랑스 파리 → 현재는 미국 뉴욕 중심으로 활동)
- **창립자:** Clément Delangue, Julien Chaumond, Thomas Wolf
- **주요 분야:** 오픈소스 AI, 머신러닝 모델 공유, 협업 플랫폼

> 원래는 **챗봇 스타트업**으로 시작했지만, 이후 오픈소스 AI 라이브러리인 **Transformers**를 공개하면서 세계적으로 유명해졌습니다.

## (2) 대표 서비스 및 기술

> (1) **Transformers**

- Hugging Face의 핵심 라이브러리입니다.
- BERT, GPT, T5, RoBERTa, LLaMA, BLOOM 등 수천 개의 사전학습 언어모델(Pretrained Model)을 쉽게 불러와 사용할 수 있습니다.
- PyTorch, TensorFlow, JAX 등 주요 딥러닝 프레임워크와 호환됩니다.
- 예:

  ```python
  from transformers import pipeline
  classifier = pipeline("sentiment-analysis")
  print(classifier("Hugging Face is awesome!"))
  ```

> (2) **Datasets**

- 전 세계 연구자와 기업이 만든 **공용 데이터셋 허브**
- 텍스트, 이미지, 오디오 등 다양한 형태 지원
- 예:

  ```python
  from datasets import load_dataset
  dataset = load_dataset("imdb")
  ```

> (3) **Hugging Face Hub**

- 모델, 데이터셋, 코드, Spaces 등을 **공유·배포하는 플랫폼**
- GitHub처럼 버전 관리와 협업이 가능
- [https://huggingface.co](https://huggingface.co) 에서 누구나 접근 가능

> (4) **Spaces**

- Streamlit, Gradio 같은 인터페이스를 이용해 **AI 데모를 웹에서 바로 실행**할 수 있게 해주는 서비스
- 예: 사용자가 만든 번역기, 이미지 생성기, 음성 인식기 등을 바로 체험 가능

> (5) **Inference API / Endpoints**

- Hugging Face 모델을 클라우드에서 **실시간 추론 서비스(API)** 형태로 배포할 수 있는 기능
- 기업용으로 많이 사용됨 (예: 모델을 직접 호스팅하지 않아도 API 호출로 결과 반환)

## (3) 커뮤니티 & 오픈소스 생태계

- 2025년 기준 **100,000개 이상의 공개 모델**, **30,000개 이상의 데이터셋** 등록
- 전 세계 연구자, 대학, 기업이 협업 중
- Meta, Google, Microsoft, OpenAI 등과도 다양한 협력 프로젝트 수행

## (4) 기술적 특징

| `항목` | `설명` |
| :---: | :---: |
| **호환성** | PyTorch, TensorFlow, JAX 등 다양한 프레임워크 지원 |
| **모듈화** | 모델 로딩, 토크나이징, 파이프라인, 파인튜닝 등 세분화 |
| **오픈소스** | Apache 2.0 라이선스 기반 |
| **확장성** | 로컬, 클라우드, GPU 환경 모두 지원 |
| **커뮤니티 중심 개발** | 누구나 Pull Request로 코드 기여 가능 |

## (5) 기업 활용 예시

| `기업` | `활용 예시` |
| :---: | :---: |
| Microsoft | Azure에서 Hugging Face 모델 바로 배포 |
| Meta | LLaMA 모델 Hugging Face Hub에 공개 |
| Google | TPU 가속 및 JAX 통합 지원 |
| 삼성전자, NAVER | 사내 NLP 모델 파인튜닝 및 평가에 사용 |

## (6) 최근 동향 (2024~2025 기준)

- `Open LLM Leaderboard`: 오픈소스 언어모델 성능 비교 벤치마크 운영
- `Inference Endpoints 확장`: 서버리스 모델 배포 서비스 강화
- `AI 윤리 및 책임성 연구`: 오픈소스 AI의 투명성과 안전성 연구 진행
- `NVIDIA`, `AWS`와의 협업 확대

