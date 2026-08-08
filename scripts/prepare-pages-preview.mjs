import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const repository = process.env.GITHUB_REPOSITORY?.split('/').at(-1) ?? 'docs';
const prefix = repository.toLowerCase().endsWith('.github.io') ? '' : repository;
const previewRoot = path.resolve('.pages-preview');
const target = path.join(previewRoot, prefix);

await rm(previewRoot, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(path.resolve('pages-output'), target, { recursive: true });
