import { access, cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const [repository = process.env.GITHUB_REPOSITORY?.split('/').at(-1)] = process.argv.slice(2);

if (!repository) {
  throw new Error('Pass the GitHub repository name or set GITHUB_REPOSITORY');
}

const source = path.resolve('build/client');
const artifact = path.resolve('pages-output');
const isUserSite = repository.toLowerCase().endsWith('.github.io');

await access(source);
await rm(artifact, { recursive: true, force: true });
await mkdir(artifact, { recursive: true });

if (isUserSite) {
  await cp(source, artifact, { recursive: true });
} else {
  const entries = await readdir(source, { withFileTypes: true });
  const prerendered = entries.find((entry) => entry.isDirectory() && entry.name === repository);

  if (!prerendered) {
    throw new Error(`Missing prerendered basename directory: build/client/${repository}`);
  }

  // Shared Vite assets are emitted at the client root, while React Router puts
  // prerendered routes below the basename. Pages already supplies that basename
  // in the public URL, so flatten only the prerendered directory into the artifact.
  for (const entry of entries) {
    if (entry.name === repository) continue;
    await cp(path.join(source, entry.name), path.join(artifact, entry.name), { recursive: true });
  }
  await cp(path.join(source, repository), artifact, { recursive: true });
}

await cp(path.join(source, '__spa-fallback.html'), path.join(artifact, '404.html'));

console.log(`Prepared GitHub Pages artifact for ${isUserSite ? '/' : `/${repository}/`}`);
