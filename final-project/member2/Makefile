.DEFAULT_GOAL := help

PROJECT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
NODE ?= node
PORT ?= 4173
DEMO_SCRIPT := collector/scripts/demo.ts

.PHONY: help setup setup-linux check run all

help:
	@echo "make setup       Cài thư viện, Chromium và biên dịch hai gói"
	@echo "make setup-linux Như setup, kèm thư viện hệ thống cho Chromium"
	@echo "make check       Chạy toàn bộ kiểm tra rồi tắt máy chủ"
	@echo "make run         Chạy toàn bộ kiểm tra và giữ máy chủ mở để demo"
	@echo "make all         Cài đặt, kiểm tra và chạy demo trong một lệnh"
	@echo "Đổi cổng: make run PORT=4180; dừng demo: Ctrl+C"

setup:
	@cd "$(PROJECT_DIR)" && (command -v pnpm >/dev/null 2>&1 || corepack enable pnpm)
	@cd "$(PROJECT_DIR)" && $(NODE) --experimental-strip-types $(DEMO_SCRIPT) --setup-only

setup-linux:
	@cd "$(PROJECT_DIR)" && (command -v pnpm >/dev/null 2>&1 || corepack enable pnpm)
	@cd "$(PROJECT_DIR)" && $(NODE) --experimental-strip-types $(DEMO_SCRIPT) --setup-only --with-deps

check:
	@cd "$(PROJECT_DIR)" && $(NODE) --experimental-strip-types $(DEMO_SCRIPT) --skip-install --check-only --port "$(PORT)"

run:
	@cd "$(PROJECT_DIR)" && $(NODE) --experimental-strip-types $(DEMO_SCRIPT) --skip-install --port "$(PORT)"

all: setup
	@cd "$(PROJECT_DIR)" && $(NODE) --experimental-strip-types $(DEMO_SCRIPT) --skip-install --port "$(PORT)"
