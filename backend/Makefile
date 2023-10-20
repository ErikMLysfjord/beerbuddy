export SHELL:=/bin/bash
export SHELLOPTS:=$(if $(SHELLOPTS),$(SHELLOPTS):)pipefail:errexit

.ONESHELL:
.PHONY: prod dev dev-memory test testv testvv mypy pylint clean help hooks docs

dev:
	docker-compose rm -f
	docker-compose up

clean-backend:
	docker-compose rm -f
	docker rmi backend-app

reset:
	docker-compose down --rmi all --volumes --remove-orphans

