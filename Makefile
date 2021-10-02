up:
	docker-compose up -d

restart:
	docker-compose restart

build:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f app
