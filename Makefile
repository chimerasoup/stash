build:
	CGO_ENABLED=1 packr2 build -mod=vendor -v

install:
	packr2 install

# Regenerates GraphQL files
.PHONY: gqlgen
gqlgen:
	go run scripts/gqlgen.go

# Runs gofmt -w on the project's source code, modifying any files that do not match its style.
.PHONY: fmt
fmt:
	go list ./... | grep -v vendor | xargs go fmt

# Runs go vet on the project's source code.
# https://stackoverflow.com/questions/40531874/how-to-make-go-linters-ignore-vendor
.PHONY: vet
vet:
	go list ./... | grep -v vendor | xargs go vet

.PHONY: lint
lint:
	revive -config revive.toml -exclude ./vendor/...  ./...
