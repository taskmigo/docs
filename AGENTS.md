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

## Verification and publishing workflow

Before creating any commit or pushing to GitHub, run these required checks from the repository root in this exact order:

```bash
npm run lint:check
npm run format:check
npm run build
```

If any check fails, fix every failure and restart the sequence from `npm run lint:check`. Do not commit or push until all three checks pass successfully.

The required sequence is:

1. Run `npm run lint:check`, `npm run format:check`, then `npm run build`.
2. Fix any failures and rerun the complete sequence until it passes.
3. Commit the complete verified change.
4. Push the commit to GitHub.

Keep commit history concise. By default, make at most one commit and one push per completed round of work. Finish the requested changes and verification before committing; do not create incremental commits for individual files, formatting fixes, or failed verification attempts. Create multiple commits only when the user explicitly requests them or when independently reviewable changes must remain separate, and explain the split before committing.

If a required check cannot run or cannot pass, stop before commit and push, then report the blocker accurately instead of claiming the check passed.
