import { constants } from 'node:fs';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const repository = process.env.GITHUB_REPOSITORY?.split('/').at(-1);
const defaultPrefix = repository && !repository.toLowerCase().endsWith('.github.io') ? `/${repository}/` : '/';
const [artifactArgument = 'pages-output', prefixArgument = defaultPrefix] = process.argv.slice(2);
const artifact = path.resolve(artifactArgument);
const prefix = `/${prefixArgument.split('/').filter(Boolean).join('/')}/`;

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(target) : [target];
  }))).flat();
}

async function exists(target) {
  try {
    await access(target, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function artifactTarget(url) {
  const pathname = new URL(url, 'https://pages.invalid').pathname;
  if (!pathname.startsWith(prefix)) {
    throw new Error(`URL does not use the Pages prefix ${prefix}: ${url}`);
  }
  return path.join(artifact, decodeURIComponent(pathname.slice(prefix.length)));
}

async function assertServable(url) {
  const target = artifactTarget(url);
  const candidates = [target, path.join(target, 'index.html')];
  if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
    throw new Error(`${url} does not map to a file in ${artifact}`);
  }
}

for (const required of [prefix, `${prefix}docs/`, `${prefix}docs/manifests/v0-site/`]) {
  await assertServable(required);
}

const htmlFiles = (await filesBelow(artifact)).filter((file) => file.endsWith('.html'));
if (htmlFiles.length === 0) throw new Error(`No HTML files found in ${artifact}`);

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const urls = new Set();

  for (const match of html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi)) {
    urls.add(match[1]);
  }
  for (const match of html.matchAll(/\bimport\s*(?:\([^)]*?\)|[^;]*?\bfrom\s*)["']([^"']+)["']/g)) {
    urls.add(match[1]);
  }

  for (const url of urls) {
    if (/^(?:data:|https?:|#)/.test(url)) continue;
    if (!url.startsWith('/')) continue;
    await assertServable(url);
  }
}

for (const requiredFile of ['.nojekyll', '404.html']) {
  if (!(await exists(path.join(artifact, requiredFile)))) {
    throw new Error(`Missing ${requiredFile} in ${artifact}`);
  }
}

console.log(`Validated ${htmlFiles.length} HTML files for deployment at ${prefix}`);
