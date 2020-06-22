.PHONY: all # Install node modules, Lint then build for prod
all: deps lint build


.PHONY: deps # Install dependencies
deps:
	npm install

.PHONY: build # Compiles and minifies for production
build:
	npm run build

.PHONY: run # Runs app on localhost
run:
	VUE_APP_BASE_API_URL="http://127.0.0.1/api" npm run serve

.PHONY: lint # Lint
lint:
	npm run lint

.PHONY: prod # Merges master into production and pushes
prod:
	git fetch && git pull origin master && git pull origin production
	git checkout production
	git merge origin master
	git push origin production
	git checkout master

# List all commands
.PHONY: help # Generate list of targets with descriptions
help:
	@grep '^.PHONY: .* #' Makefile | sed 's/\.PHONY: \(.*\) # \(.*\)/\1 -> \2/' | expand -t20
