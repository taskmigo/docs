# Troubleshooting

Environment-specific issues encountered while working on this repository. Check
this file before installing dependencies or running verification gates.

## Verification tools are missing in a fresh checkout

**Environment:** A fresh or ephemeral checkout where npm dependencies have not
been installed.

**Symptom:** `npm run lint:check` fails with `oxlint: not found` (and other npm
scripts may report missing locally installed tools).

**Workaround:** Install the locked dependencies with `npm ci` before starting the
verification sequence. After installation succeeds, restart the full sequence at
`npm run lint:check`.

## npm cannot write to its default cache

**Environment:** A restricted or containerized environment where `/root/.npm` is
not writable.

**Symptom:** `npm ci` fails while trying to write to the default npm cache and may
leave an incomplete `node_modules` directory. Subsequent verification commands
can then fail with missing or partially installed packages.

**Workaround:** Move the incomplete `node_modules` directory out of the checkout,
then reinstall from the lockfile with a writable temporary cache:

```bash
mv node_modules /tmp/taskmigo-docs-node_modules-incomplete
npm ci --cache /tmp/taskmigo-docs-npm-cache
```

Do not reuse the incomplete installation. After `npm ci` succeeds, restart the
full verification sequence at `npm run lint:check`.
