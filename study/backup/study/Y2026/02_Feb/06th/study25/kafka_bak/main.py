from kafka import kafkaProducer

pd = kafkaProducer(bootstrap_servers='localhost:9092')

pd.send('test', b'Hello')
pd.flush()