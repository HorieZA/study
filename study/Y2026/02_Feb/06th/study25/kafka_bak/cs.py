from kafka import kafkaConsumer

cs = kafkaConsumer('test',bootstrap_servers=['localhost:9092'])

for msg in cs:
  print(msg.value)