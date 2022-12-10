PKG_PREFIX := https://github.com/VictoriaMetrics/grafana-datasource

DATEINFO_TAG ?= $(shell date -u +'%Y%m%d-%H%M%S')
BUILDINFO_TAG ?= $(shell echo $$(git describe --long --all | tr '/' '-')$$( \
	      git diff-index --quiet HEAD -- || echo '-dirty-'$$(git diff-index -u HEAD | openssl sha1 | cut -d' ' -f2 | cut -c 1-8)))

PKG_TAG ?= $(shell git tag -l --points-at HEAD)
ifeq ($(PKG_TAG),)
PKG_TAG := $(BUILDINFO_TAG)
endif

GO_BUILDINFO = -X '$(PKG_PREFIX)/dist/buildinfo.Version=$(APP_NAME)-$(DATEINFO_TAG)-$(BUILDINFO_TAG)'

.PHONY: $(MAKECMDGOALS)

include pkg/Makefile
include deployment/*/Makefile

app-local-goos-goarch:
	CGO_ENABLED=$(CGO_ENABLED) GOOS=$(GOOS) GOARCH=$(GOARCH) go build $(RACE) -ldflags "$(GO_BUILDINFO)" -o dist/$(APP_NAME)_$(GOOS)_$(GOARCH)$(RACE) pkg/

app-via-docker-goos-goarch:
	APP_SUFFIX='_$(GOOS)_$(GOARCH)' \
	DOCKER_OPTS='--env CGO_ENABLED=$(CGO_ENABLED) --env GOOS=$(GOOS) --env GOARCH=$(GOARCH)' \
	$(MAKE) app-via-docker

app-via-docker-linux-amd64:
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 $(MAKE) app-via-docker-goos-goarch

app-via-docker-linux-arm:
	CGO_ENABLED=0 GOOS=linux GOARCH=arm $(MAKE) app-via-docker-goos-goarch

app-via-docker-linux-386:
	CGO_ENABLED=0 GOOS=linux GOARCH=386 $(MAKE) app-via-docker-goos-goarch

app-via-docker-linux-arm64:
ifeq ($(APP_NAME),vmagent)
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 $(MAKE) app-via-docker-goos-goarch
else
	APP_SUFFIX='_linux_arm64' \
	DOCKER_OPTS='--env CGO_ENABLED=1 --env GOOS=linux --env GOARCH=arm64 --env CC=/opt/cross-builder/aarch64-linux-musl-cross/bin/aarch64-linux-musl-gcc' \
	$(MAKE) app-via-docker
endif

app-via-docker-darwin-amd64:
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 $(MAKE) app-via-docker-goos-goarch

app-via-docker-darwin-arm64:
	CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 $(MAKE) app-via-docker-goos-goarch

victoriametrics-backend-plugin-build: \
	victoriametrics-backend-plugin-linux-amd64-prod \
	victoriametrics-backend-plugin-linux-arm-prod \
	victoriametrics-backend-plugin-linux-arm64-prod \
	victoriametrics-backend-plugin-linux-386-prod \
	victoriametrics-backend-plugin-amd64-prod \
	victoriametrics-backend-plugin-arm64-prod

victorimetrics-frontend-plugin-build: \
	frontend-build

victoriametrics-datasource-plugin-build: \
	victorimetrics-frontend-plugin-build \
	victoriametrics-backend-plugin-build

victoriametrics-datasource-plugin-pack:
	tar -czf victoriametrics-datasource-$(PKG_TAG).tar.gz ./dist \
	&& sha256sum victoriametrics-datasource-$(PKG_TAG).tar.gz \
	> victoriametrics-datasource-$(PKG_TAG)_checksums.txt


victoriametrics-datasource-plugin-release: \
	victorimetrics-frontend-plugin-build \
	victoriametrics-backend-plugin-build \
	victoriametrics-datasource-plugin-pack
