#!/usr/bin/env bash
set -euo pipefail

port="4173"
preview_root="$(mktemp -d)"
base_url="http://127.0.0.1:${port}/docs"
scalar_esm_url="https://cdn.jsdelivr.net/npm/@scalar/api-reference/+esm"

cleanup() {
  kill "${server_pid:-}" 2>/dev/null || true
  rm -rf "${preview_root}"
}
trap cleanup EXIT

ln -s "${PWD}/out" "${preview_root}/docs"

python3 -m http.server "${port}" --directory "${preview_root}" >/tmp/taskmigo-docs-http.log 2>&1 &
server_pid=$!

for _ in {1..20}; do
  if curl --silent --fail "${base_url}/" >/dev/null; then
    break
  fi
  sleep 0.25
done

api_reference="$(curl --silent --show-error --fail --location "${base_url}/api-reference/")"
openapi="$(curl --silent --show-error --fail --location "${base_url}/openapi/v0/openapi.yaml")"
scalar_esm="$(curl --silent --show-error --fail --location "${scalar_esm_url}")"

grep -Fq "createApiReference" <<<"${api_reference}"
grep -Fq "../openapi/v0/openapi.yaml" <<<"${api_reference}"
grep -Fq "openapi: 3.2.0" <<<"${openapi}"
grep -Fq "createApiReference" <<<"${scalar_esm}"

printf 'Verified %s/api-reference/\n' "${base_url}"
printf 'Verified %s/openapi/v0/openapi.yaml\n' "${base_url}"
printf 'Verified Scalar ESM module: %s\n' "${scalar_esm_url}"
