## Kafka 설치 위치
- `/opt/kafka/bin/`


## 프로잭트 폴더에서 터미널 실행
## study26

## 이미지 빌드
```bash
docker-compose build
```

# 전체 실행
```bash
docker-compose up -d
```

# Kafka 정상 확인
```bash
docker logs kafka
```

# (최초 1회) 토픽 생성
```bash
docker exec -it kafka /bin/bash
```

```bash
./kafka-topics.sh --bootstrap-server kafka:9092 --create --topic mail-topic --partitions 1 --replication-factor 1
```

# docker exec -it kafka bash
# ./bin/kafka-topics.sh \
#   --bootstrap-server kafka:9092 \
#   --create \
#   --topic mail-topic \
#   --partitions 1 \
#   --replication-factor 1