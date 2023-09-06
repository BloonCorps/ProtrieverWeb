# ProtrieverWeb
Website at protriever.org


# Tunnel Management Backend

pktriot.exe configure --url
pktriot.exe tunnel http add --domain quirky-firefly-91712.pktriot.net --destination localhost --http 8000 --letsencrypt 
pktriot.exe edit --name 'protriever-react'
pktriot.exe start 

# Tunnel Management Frontend 

ssh -R protriever:80:localhost:80 serveo.net
