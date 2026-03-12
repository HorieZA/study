from kafka import KafkaConsumer

cs = KafkaConsumer('test', bootstrap_servers=['localhost:9092']) # 이때 그룹이 지정되있으면 그룹도 넣을 수 있음 (지금은 X)

for msg in cs:
  print(msg.value) # 키 , 토픽 다 볼 수 있지만 간단하게 값만 보기