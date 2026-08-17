# AGENTS.md

Repository-wide instructions for AI agents working on the Taskmigo documentation site.

## Source of truth

- Use the content on the current branch under `content/versions/v0/` as the product contract.
- Read the pages relevant to the task before changing behavior. For cross-cutting product changes, review the affected manuals and the developer domain/architecture pages together.
- Do not present planned work as implemented behavior. Product documentation may define the target contract before implementation exists; `manuals/status.mdx` records delivery state.
- Keep product-specific rules in the documentation, not in this file.

## Repository and GitHub workflow

- Read `AGENTS.md` from the target branch before modifying repository content.
- A local checkout is preferred for editing and verification, but is not mandatory. Continue through the GitHub integration when a local checkout is unavailable.
- Use the GitHub plugin for GitHub interactions, including branches, commits, pull requests, and remote repository state. Do not use `gh` CLI when the plugin provides the operation.
- Keep remote writes scoped and intentional. Preserve unrelated changes and avoid one-commit-per-file noise.

## Authoring

- Write public documentation in English.
- Manuals are the canonical product contract for users, administrators, QA, and product managers. Developer documentation explains implementation boundaries and invariants without inventing repository-specific classes or packages that do not exist yet.
- Prefer concrete outcomes and examples over abstract prose. Define unavoidable domain terms on first use.
- Keep each rule in one canonical location and link to it elsewhere. Remove filler and repeated rules.
- Use Mermaid when relationships or lifecycles are materially easier to understand visually. Do not duplicate simple prose or tables as diagrams.
- Follow existing Fumadocs and MDX patterns. Prefer suitable `fumadocs-ui` components over raw HTML.
- Distinguish product contract from delivery state. Record planned and deferred capabilities in `content/versions/v0/manuals/status.mdx`.

## Product design constraints

- Taskmigo is a modern, self-hostable project and issue management product positioned as an alternative to Redmine, not a compatibility clone.
- Projects are the primary collaboration and authorization boundary.
- Authorization is additive RBAC: users receive project roles directly or through groups; permissions are grants only. Do not introduce explicit deny semantics or role inheritance without a product-level design change.
- System administration is separate from project roles.
- Keep the initial domain small enough to implement coherently. Deferred features must not leak partial contracts into the core model.

## Change checklist

- Update every affected canonical page, example, cross-link, and navigation entry for user-facing contract changes.
- Update the nearest `meta.json` when adding, removing, or reordering pages.
- Verify changed internal links and inbound references to renamed headings or pages.
- Do not hand-edit generated output.

## Verification and publishing workflow

Before installing dependencies or running verification in a new environment, read [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md).

Run the repository gates in this order:

```bash
npm run lint:check
npm run format:check
npm run types:check
npm run build
```

Fix every failure and restart from `npm run lint:check` after any content or code change that can affect the result. `npm run lint:fix` can fix some lint issues but does not replace manual fixes. Use `npm run format:fix` for formatting failures.

When local verification is unavailable, use another environment that executes the repository's actual gates against the exact change. Never claim verification passed unless the required commands actually passed.

Keep commit history concise. By default, make at most one commit and one push per completed round of work.
