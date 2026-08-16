# AGENTS.md

Repository-wide instructions for AI agents working on the Taskmigo documentation site.

## Source of truth

- Use the content on the current branch under `content/versions/v0/manuals/` as the product contract. The deployed site and generated `llms.txt` routes may lag behind unpublished changes.
- Read the pages relevant to the task. For cross-cutting changes, also review `manuals/resources.mdx`, `manuals/runtime.mdx`, `manuals/status.mdx`, the affected files under `manuals/manifests/`, and the implementation consequences under `developer/`.
- Do not invent behavior, infer current behavior from planned work, or present an RFC as supported behavior. Ask for clarification when the contract is ambiguous or contradictory.
- Keep product-specific rules in the documentation, not in this file, so there is only one maintained source of truth.

## Repository and GitHub workflow

- Prefer creating or using a local checkout of the target repository and branch for editing, diff inspection, and verification because local execution usually gives the fastest feedback loop.
- Read `AGENTS.md` from the target branch before modifying repository content. When a local checkout is available, the working-tree copy takes precedence over remotely fetched copies.
- A local checkout is preferred, not mandatory. If the environment cannot provide one, continue through the GitHub integration instead of blocking work solely on checkout availability.
- Use the GitHub plugin for GitHub interactions: reading remote repository state, creating or updating branches and commits, publishing changes, and creating or updating pull requests. Do not use `gh` CLI or direct GitHub network calls when the plugin provides the required operation.
- Keep remote writes scoped and intentional. Preserve unrelated changes and avoid one-commit-per-file noise unless independently reviewable commits are actually useful.

## Authoring

- Write public documentation in English for Taskmigo users. Avoid implementation details unless they are part of the public contract.
- Manuals serve product users, manifest developers, QC/QA, and product managers. Developer documentation is a development handbook for engineers and coding agents implementing Taskmigo. Keep `content/versions/v0/developer/index.mdx` as a short routing page and `content/versions/v0/developer/development-instructions.mdx` as the canonical implementation playbook. Developer guidance must be executable by a junior engineer or middle-capability coding agent: identify prerequisites, owning module/package, concrete classes/interfaces/methods or extension points, persistence and transaction behavior, concurrency/crash boundaries, failure states, tests, verification, and definition of done whenever those concerns apply. Do not stop at architectural intent such as “add a service” or “persist the state” when the current design contains enough information to say how. Link subsystem-specific details to their canonical page instead of repeating them. Do not reference active PRs, branches, commits, or implementation history in the system design.
- Developer instructions must distinguish stable implementation requirements from open product decisions. When a public API, retention value, artifact format, queue policy, or other behavior is unresolved, tell the implementer what stable internal boundary can be completed and explicitly instruct them not to invent the missing contract.
- The version context is already established by the page location. Avoid redundant prose such as “in v0”; preserve required identifiers and routes such as `v0/site` and `/versions/v0/manuals/...`.
- Distinguish current behavior, limitations, known issues, planned work, open decisions, and RFCs explicitly.
- Follow existing Fumadocs and MDX patterns. Prefer suitable `fumadocs-ui` components over raw HTML.
- Prefer concrete outcomes and examples over abstract descriptions. Define unavoidable terms on first use and do not assume that product users know React, graph, database, or runtime terminology.
- Label illustrative identifiers and data as examples when readers could otherwise mistake them for built-in fields, context values, or supported resources.
- Keep each rule in one canonical location and link to it elsewhere. Remove filler, repeated rules, and general knowledge that does not help readers use or implement Taskmigo.
- Use Mermaid instead of ASCII diagrams. Keep diagrams small, label edges and outcomes clearly, and explain the practical takeaway in nearby prose. Do not repeat a table or simple prose as a diagram.
- Use emoji only as a compact, accessible scanning aid in a legend, status, or small matrix. Pair each emoji with a text label or legend; never rely on color or emoji alone to communicate a rule.

## MDX and content components

Use components only when they improve navigation, comparison, sequence, or emphasis. Keep required contract information in the primary reading path.

- **Accordion and Accordions:** FAQs, optional details, or long secondary explanations.
- **Banner:** Reserve for a high-priority, site-wide announcement configured at the page or layout level. Use a Callout for an important note inside an article.
- **Code blocks:** Use fenced Markdown code blocks for static code, commands, configuration, and manifests. Add a language such as `yaml`, `bash`, or `tsx`. Use the dynamic code-block component only when the rendered example must change at runtime.
- **Files, Folder, and File:** Directory layouts or multi-file architecture; use a list for a short flat set of files.
- **GitHub Info:** Live repository information that materially helps a repository or installation page; otherwise use a source link.
- **Image Zoom:** Use for screenshots, diagrams, or mockups whose details are difficult to inspect at inline size. Always provide meaningful alternative text.
- **Inline TOC:** Long overview or index pages with many peer sections.
- **Steps:** Procedures and lifecycle sequences where order is meaningful.
- **Tabs:** Equivalent alternatives such as package managers or platforms; never split one sequential procedure across tabs.
- **Type Table:** Use `TypeTable` for `Fields` sections and UI component prop references. A page may use multiple tables when they follow the reading flow: keep top-level fields together, link standalone named types with `typeDescriptionLink`, then place each named type's complete table in its linked section. Do not duplicate the same field across summary and detail tables. The `type` column contains the actual data shape only: primitive types, literal unions, arrays, objects, dictionaries, or named structured contracts. Put semantic formats and validation constraints such as URL, absolute path, duration, integer, or locale tag in the description; do not invent type aliases for them. A parent may use `object` or `object[]` when its nested fields are listed in the same table. Use `Dictionary` for untyped dynamic keys and `Dictionary<T>` when every value has type `T`; do not write `Dictionary<unknown>` or add `typeDescriptionLink` to a Dictionary. Define `T` in the table or the immediately following linked section. Keep longer semantics, examples, and lifecycle behavior after the relevant table. Do not create a section for information that fits clearly in a type description; a section must add a substantial contract, table, example, lifecycle, or decision rule. For Expression-capable fields, wrap the underlying type in `FieldType` with `supportsExpression={true}` (for example, `<FieldType supportsExpression={true}>string</FieldType>`). Do not spell the type as `Expression`, `Expression<T>`, or a union including `Expression`. Treat the tables together as the source of truth for type, required state, and Expression support; do not restate those facts in nearby prose or validation lists.
- **Cards:** Landing-page navigation or a small set of useful next steps.
- **Callouts:** Notes, tips, warnings, and safety-critical constraints; keep the primary contract in normal prose.

Before adding a visual component, ask what question it answers:

| Reader question                          | Preferred format |
| ---------------------------------------- | ---------------- |
| “What values map to what outcomes?”      | Table            |
| “What do I do first, next, and last?”    | Steps            |
| “How do these resources relate?”         | Mermaid          |
| “Which equivalent option applies to me?” | Tabs             |
| “Where should I go next?”                | Cards            |
| “What must I not miss?”                  | Callout          |

`Auto Type Table` and `Graph View` are not available in the repository's current `fumadocs-ui` version. Do not use or document them as available components unless the dependency and site integration are added first. Import non-global components from their existing `fumadocs-ui/components/*` entry points and follow examples already present in this repository. Components provided by the default MDX mapping, such as `Callout`, `Card`, and `Cards`, do not need local imports.

## Change checklist

- For a user-facing contract change, update every affected canonical page, example, cross-link, and FAQ entry.
- Record limitations, known issues, RFCs, and unresolved decisions in `content/versions/v0/manuals/status.mdx`.
- Verify edited internal routes and fragments, changed external links, and inbound references to renamed headings or IDs.
- Update the nearest `meta.json` when adding, removing, or reordering pages.
- Do not hand-edit generated output. Preserve unrelated changes and keep the diff scoped to the request.

## Verification and publishing workflow

Before installing dependencies or running verification in a new environment, read [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md). Apply any matching environment workaround first so known setup failures do not interrupt or invalidate the verification run.

Verification checks must pass before a change is considered complete. Prefer running them locally because that is normally the fastest path, but local execution is not the requirement itself: successful verification is.

Run the repository gates in this order:

```bash
npm run lint:check
npm run format:check
npm run types:check
npm run build
```

- Fix every failure and restart from `npm run lint:check` after any content or code change that can affect the result. `npm run lint:fix` can fix some lint issues, but review its changes and manually fix diagnostics that remain. Use `npm run format:fix` for formatting failures; fix type-check and build failures manually.
- When a GitHub publish is required and the preferred local verification path is unavailable or blocked, actively find another valid way to run the same verification gates. Do not stop merely because the first environment cannot run them.
- An alternative verification environment must execute the repository's actual gates against the exact change being published. Do not weaken, skip, replace, or reinterpret a failing gate as success.
- GitHub Actions or another runner may be used when necessary to execute the real verification commands, but never create or modify CI solely to manufacture a passing result, and never claim verification passed unless the required commands actually passed.
- Use the GitHub plugin for publishing and all GitHub-side operations after verification. Do not use `gh` CLI when the plugin can perform the operation.

Keep commit history concise. By default, make at most one commit and one push per completed round of work. Finish the requested changes and verification before the final publish step; do not create incremental commits for individual files, formatting fixes, or failed verification attempts unless the user explicitly asks for them or independently reviewable changes must remain separate.
