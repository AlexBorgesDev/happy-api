include .env

service = service

.PHONY: up

up:
  docker compose up -d

.PHONY: down

down:
  docker compose down

.PHONY: logs

logs:
  docker compose logs -f ${service}

.PHONY: api-terminal

api-terminal:
  docker compose exec api sh
