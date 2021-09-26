up_db:
	docker-compose -f db.docker-compose.yml up -d
down_db:
	docker-compose -f db.docker-compose.yml down
env:
	cp .env.example .env

first_run: env up_db
	npm ci && \
	npm run typeorm:run
	npm run start:dev

run: up_db
	npm run start:dev

lint:
	npm run lint

clean_full: down_db
	npm run prebuild && \
	rm -rf node_modules && \
	rm .env
