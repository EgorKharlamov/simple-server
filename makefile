up_db:
	docker-compose -f db.docker-compose.yml up -d
down_db:
	docker-compose -f db.docker-compose.yml down
env:
	cp .env.example .env

first_run: env up_db
	npm ci && \
	npm run start:dev

run: up_db
	npm run start:dev
