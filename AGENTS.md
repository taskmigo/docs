# AGENTS.md

This file provides repository-wide instructions for AI agents working on the Taskmigo documentation site.

## Repository purpose

This repository contains the public Taskmigo documentation, built with Next.js and Fumadocs. The current documentation contract lives under `content/versions/v0/`.

Treat documentation changes as product-contract changes. Do not invent behavior to fill a gap, silently promote an RFC to supported behavior, or infer a contract from planned work. If the requested behavior is ambiguous or conflicts with another page, stop and ask for clarification.

## Read before editing

Read the pages relevant to the task before changing content. For cross-cutting product behavior, review all of these files:

- `content/versions/v0/resources.mdx` — common manifest shape, identity, revisions, imports, and resolution.
- `content/versions/v0/runtime.mdx` — validation, snapshots, activation, and runtime RFCs.
- `content/versions/v0/status.mdx` — defined work, planned work, limitations, known issues, and open decisions.
- `content/versions/v0/faq.mdx` — concise answers and links to canonical explanations.
- `content/versions/v0/manifests/*.mdx` — kind-specific fields and validation.
- `content/versions/v0/architecture.mdx` — system and deployment boundaries.

Use the repository content on the current branch as the source of truth. The deployed site and generated `llms.txt` routes may lag behind an unpublished branch.

## Current product guardrails

Preserve these rules unless the user explicitly changes the product contract:

- A valid system contains exactly one logical Site across the entire Site kind family. Revisions do not create additional Sites.
- The import-ability matrix is exhaustive. The only currently allowed edge is `v0/site` importing `v0/application`.
- An Application cannot import any resource.
- A Translation may declare `imports: []` for compatibility with the common shape, but it cannot import any resource.
- No manifest may import `v0/translation`. Taskmigo attaches the effective locale catalog automatically.
- Multi-level dependency recovery is an RFC for future import graphs, not current runtime behavior.
- Planned kinds are not public contracts until they have dedicated reference pages.
- A kind prefix such as `v0/application` selects a manifest schema. The optional top-level `version` identifies an immutable resource revision; these concepts are not interchangeable.
- Candidate graphs activate atomically. An invalid candidate must not replace or partially modify the current snapshot.
- `TransN` follows Unicode CLDR plural rules. Missing placeholder values cause a runtime error.

When a product rule changes, update every affected canonical page, FAQ entry, cross-link, example, and status item in the same change.

## Documentation standards

- Write all public documentation in English.
- Write for Taskmigo users. Avoid implementation-language details unless they are part of the public contract.
- Be concise, direct, and task-oriented. Prefer one canonical explanation with links over repeated explanations.
- Pages under `content/versions/v0/` already establish the version context. Do not repeat phrases such as “in v0” or “Version 0” in prose unless comparing versions. Keep required identifiers and routes such as `v0/site` and `/versions/v0/resources` unchanged.
- Keep common manifest fields in `resources.mdx`. Kind reference pages should document only their additional `spec` fields, kind-specific import behavior, examples, and validation.
- Distinguish defined behavior, limitations, planned work, and RFCs explicitly. Never describe future behavior in the present tense without an RFC or planned-work label.
- Add or update FAQ coverage for every user-facing contract change. FAQ answers should stay short and link to the canonical section.
- Record limitations, known issues, and unresolved decisions in `status.mdx`.
- Use consistent contract terms: **Site**, **Application**, and **Translation** for resource concepts; use code formatting for literal kind identifiers, fields, values, and references.

## MDX and visual components

- Prefer Fumadocs UI components over raw HTML or ad hoc Markdown structures when a suitable component exists.
- Follow existing import patterns, for example:
  - `fumadocs-ui/components/accordion`
  - `fumadocs-ui/components/card`
  - `fumadocs-ui/components/steps`
  - `fumadocs-ui/components/tabs`
- Use `<Callout>` for important constraints, warnings, RFC status, and operational notes.
- Use `<Cards>` for navigational choices, `<Steps>` for ordered workflows, `<Tabs>` for alternative states, and `<Accordions>` for FAQ content.
- Mermaid is supported. Use it only when relationships, branching, or event order are materially easier to understand visually. Do not add a diagram that merely repeats a table or short prose explanation.
- Keep examples consistent with the current contract. Clearly label intentionally invalid examples.
- Preserve valid MDX nesting and formatting. Use existing pages as the syntax reference.

## Links and navigation

- Use absolute documentation routes such as `/versions/v0/resources#import-ability`.
- Before completing a change, verify that every edited internal route exists and every fragment matches a real heading or explicit component `id`.
- Check inbound links when renaming a heading, moving a page, or changing an FAQ `id`.
- Verify newly added or modified external links against the authoritative source.
- Update the nearest `meta.json` when adding, removing, or reordering documentation pages.
- Do not link readers to planned content as though it were a defined contract.

## Code and repository conventions

- Use `npm`; `package-lock.json` is the lockfile.
- Keep documentation content in `content/versions/` and reusable site code in `src/`.
- Do not hand-edit generated output. The `llms.txt` and `llms-full.txt` endpoints are generated from the documentation source.
- Preserve unrelated user changes and keep the diff scoped to the request.
- Use `rg` or `rg --files` for repository searches.

## Validation

Run the checks relevant to the change from the repository root:

```bash
npm run format
npm run format:check
npm run lint:check
npm run types:check
npm run build
git diff --check
```

For documentation changes, also perform a source-level review:

1. Verify edited internal routes and anchors.
2. Search for stale terms, old anchors, and contradictory rules.
3. Confirm examples obey the import matrix and other current constraints.
4. Confirm new limitations or known issues appear in Product status.
5. Confirm a useful FAQ entry exists for each user-facing contract change.
6. Review the final diff for duplicated explanations and unnecessary diagrams.

If a command cannot run because of an environment or dependency failure, report the exact unrun check. Do not claim it passed and do not weaken the source-level review.
