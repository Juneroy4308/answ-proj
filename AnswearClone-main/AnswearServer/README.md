# Create react app in docker

DATA base Posgres is good
```
docker pull postgres:16.1

docker images

docker run --name container-postgres \
	--restart=always \
	-e POSTGRES_PASSWORD=p%rSDj4Imds07udIed73Jhdsofdjc**dmUntdOidd3dZ_#WTi4B9Zo \
	-e POSTGRES_USER=krot \
	-p 5022:5432 \
	-v /data/postgresql/data:/var/lib/postgresql/data \
	-d postgres:16.1

docker ps
docker ps -a

docker stop container-postgres
docker rm container-postgres

docker rmi postgres
```


Create docker hub repository - publish
```
docker build -t answear-api . 
docker run -it --rm -p 5559:8080 --name answear_container answear-api
docker run -d --restart=always --name answear_container -p 5559:8080 answear-api
docker run -d --restart=always -v d:/volumes/api/images:/app/Images --name answear_container -p 5559:8080 answear-api
docker run -d --restart=always -v /volumes/api/images:/app/Images --name answear_container -p 5559:8080 answear-api
docker ps -a
docker stop answear_container
docker rm answear_container

docker images --all
docker rmi answear-api

docker login
docker tag answear-api:latest deadlightdie/answear-api:latest
docker push deadlightdie/answear-api:latest

docker pull deadlightdie/answear-api:latest
docker ps -a
docker run -d --restart=always -v /volumes/api/images:/app/Images --name answear_container -p 5559:8080 deadlightdie/answear-api


docker pull deadlightdie/answear-api:latest
docker images --all
docker ps -a
docker stop answear_container
docker rm answear_container
docker run -d --restart=always --name answear_container -p 5559:8080 deadlightdie/answear-api
```

```nginx options /etc/nginx/sites-available/default
server {
    server_name   answear-api.tohaproject.click *.answear-api.tohaproject.click;
    location / {
       proxy_pass         http://localhost:5559;
       proxy_http_version 1.1;
       proxy_set_header   Upgrade $http_upgrade;
       proxy_set_header   Connection keep-alive;
       proxy_set_header   Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header   X-Forwarded-Proto $scheme;
    }
}

server {
		server_name   answear.tohaproject.click *.answear.tohaproject.click;
		root /var/answear.tohaproject.click;
		index index.html;

		location / {
			try_files $uri /index.html;
			#try_files $uri $uri/ =404;
		}
}

sudo systemctl restart nginx
certbot
```

/var/answear-api.tohaproject.click/





