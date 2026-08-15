#!/usr/bin/env bash
set -euo pipefail

port="4173"
base_url="http://127.0.0.1:${port}"

python3 -m http.server "${port}" --directory out >/tmp/taskmigo-docs-http.log 2>&1 &
server_pid=$!
trap 'kill "${server_pid}" 2>/dev/null || true' EXIT

for _ in {1..20}; do
  if curl --silent --fail "${base_url}/" >/dev/null; then
    break
  fi
  sleep 0.25
done

api_reference="$(curl --silent --show-error --fail --location "${base_url}/api-reference/")"
openapi="$(curl --silent --show-error --fail --location "${base_url}/openapi/v0/openapi.yaml")"

grep -Fq "createApiReference" <<<"${api_reference}"
grep -Fq "../openapi/v0/openapi.yaml" <<<"${api_reference}"
grep -Fq "openapi: 3.2.0" <<<"${openapi}"

printf 'Verified %s/api-reference/\n' "${base_url}"
printf 'Verified %s/openapi/v0/openapi.yaml\n' "${base_url}"
