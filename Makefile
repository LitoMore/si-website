.DEFAULT_GOAL := default
.SILENT: install fmt-check lint dev build preview serve

install:
	deno install --allow-scripts=npm:@swc/core

fmt-check:
	deno fmt --quiet --check

lint:
	deno lint --quiet

dev:
	deno task dev

build:
	deno task build

preview:
	deno task preview

serve:
	deno task serve

default: install fmt-check lint
