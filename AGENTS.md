# AGENTS.md

Repository-wide instructions for AI agents working on the Taskmigo documentation site.

## Source of truth

- Use the content on the current branch under `content/versions/v0/` as the product contract. The deployed site and generated `llms.txt` routes may lag behind unpublished changes.
- Read the pages relevant to the task. For cross-cutting changes, also review `resources.mdx`, `runtime.mdx`, `architecture.mdx`, `status.mdx`, `faq.mdx`, and the affected files under `manifests/`.
- Do not invent behavior, infer current behavior from planned work, or present an RFC as supported behavior. Ask for clarification when the contract is ambiguous or contradictory.
- Keep product-specific rules in the documentation, not in this file, so there is only one maintained source of truth.

## Authoring

- Write public documentation in English for Taskmigo users. Avoid implementation details unless they are part of the public contract.
- Be concise and task-oriented. Prefer one canonical explanation with links over repeated content.
- The version context is already established by the page location. Avoid redundant prose such as “in v0”; preserve required identifiers and routes such as `v0/site` and `/versions/v0/...`.
- Distinguish current behavior, limitations, known issues, planned work, open decisions, and RFCs explicitly.
- Follow existing Fumadocs and MDX patterns. Prefer suitable `fumadocs-ui` components over raw HTML.
- Use Mermaid only when it makes a workflow or relationship materially easier to understand; do not repeat a table or simple prose as a diagram.

## Change checklist

- For a user-facing contract change, update every affected canonical page, example, cross-link, and FAQ entry.
- Record limitations, known issues, RFCs, and unresolved decisions in `content/versions/v0/status.mdx`.
- Verify edited internal routes and fragments, changed external links, and inbound references to renamed headings or IDs.
- Update the nearest `meta.json` when adding, removing, or reordering pages.
- Do not hand-edit generated output. Preserve unrelated changes and keep the diff scoped to the request.

Run the relevant checks from the repository root:

```bash
npm run format
npm run format:check
npm run lint:check
npm run types:check
npm run build
git diff --check
```

If a check cannot run, report it accurately instead of claiming it passed.
