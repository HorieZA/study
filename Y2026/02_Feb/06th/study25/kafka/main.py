from kafka import KafkaProducer # MSG 만드는애

pd = KafkaProducer(bootstrap_servers='localhost:9092') # 도커에서 포트포워딩으로 kafka 이미 만들어서 9092 쓸 수 있음

pd.send('test', b'Hello')
pd.send('test', b'Hello2')
pd.send('test', b'Hello3')
pd.flush()